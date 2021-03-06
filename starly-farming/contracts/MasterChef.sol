// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

library SafeBEP20 {
    using SafeMath for uint256;
    using Address for address;

    function safeTransfer(
        IBEP20 token,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(
        IBEP20 token,
        address from,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    /**
     * @dev Deprecated. This function has issues similar to the ones found in
     * {IBEP20-approve}, and its usage is discouraged.
     *
     * Whenever possible, use {safeIncreaseAllowance} and
     * {safeDecreaseAllowance} instead.
     */
    function safeApprove(
        IBEP20 token,
        address spender,
        uint256 value
    ) internal {
        // safeApprove should only be called when setting an initial allowance,
        // or when resetting it to zero. To increase and decrease it, use
        // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'
        // solhint-disable-next-line max-line-length
        require(
            (value == 0) || (token.allowance(address(this), spender) == 0),
            'SafeBEP20: approve from non-zero to non-zero allowance'
        );
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    function safeIncreaseAllowance(
        IBEP20 token,
        address spender,
        uint256 value
    ) internal {
        uint256 newAllowance = token.allowance(address(this), spender).add(value);
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    function safeDecreaseAllowance(
        IBEP20 token,
        address spender,
        uint256 value
    ) internal {
        uint256 newAllowance = token.allowance(address(this), spender).sub(
            value,
            'SafeBEP20: decreased allowance below zero'
        );
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IBEP20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(token).functionCall(data, 'SafeBEP20: low-level call failed');
        if (returndata.length > 0) {
            // Return data is optional
            // solhint-disable-next-line max-line-length
            require(abi.decode(returndata, (bool)), 'SafeBEP20: BEP20 operation did not succeed');
        }
    }
}
import "./STLYToken.sol";
import "./libs/IStarlyReferral.sol";

interface IMigratorChef {
    function migrate(IBEP20 token) external returns (IBEP20);
}

// MasterChef is the master of STLY. He can make STLY and he is a fair guy.
//
// Note that it's ownable and the owner wields tremendous power. The ownership
// will be transferred to a governance smart contract once STLY is sufficiently
// distributed and the community can show to govern itself.
//
// Have fun reading it. Hopefully it's bug-free. God bless.
contract MasterChef is Ownable {
    using SafeMath for uint256;
    using SafeBEP20 for IBEP20;
    // Info of each user.
    struct UserInfo {
        uint256 amount; // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        //
        // We do some fancy math here. Basically, any point in time, the amount of STLYs
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * pool.accSTLYPerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accSTLYPerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }
    // Info of each pool.
    struct PoolInfo {
        IBEP20 lpToken; // Address of LP token contract.
        uint256 allocPoint; // How many allocation points assigned to this pool. STLYs to distribute per block.
        uint256 lastRewardBlock; // Last block number that STLYs distribution occurs.
        uint256 accSTLYPerShare; // Accumulated STLYs per share, times 1e12. See below.
    }
    // The STLY TOKEN!
    STLYToken public STLY;
    //Pools, Farms, Dev, Refs percent decimals
    uint256 public percentDec = 1000000;
    //Pools and Farms percent from token per block
    uint256 public stakingPercent;
    //Developers percent from token per block
    uint256 public devPercent;
    //Referrals percent from token per block
    uint256 public refPercent;
    //Safu fund percent from token per block
    uint256 public safuPercent;
    // Dev address.
    address public devaddr;
    // Safu fund.
    address public safuaddr;
    // Refferals commision address.
    address public refAddr;
    // Last block when developer withdraw dev fee
    uint256 public lastBlockDevWithdraw;
    // Last block when withdraw ref fee
    uint256 public lastBlockRefWithdraw;
    // STLY tokens created per block.
    uint256 public STLYPerBlock;
    // Bonus multiplier for early STLY makers.
    uint256 public BONUS_MULTIPLIER = 1;
    // The migrator contract. It has a lot of power. Can only be set through governance (owner).
    IMigratorChef public migrator;
    // Info of each pool.
    PoolInfo[] public poolInfo;
    // Info of each user that stakes LP tokens.
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;
    // Total allocation poitns. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;
    // The block number when STLY mining starts.
    uint256 public startBlock;
    // Deposited amount STLY in MasterChef
    uint256 public depositedStly;
    // Starly referral contract address.
    IStarlyReferral public starlyReferral;
    // Referral commission rate in basis points.
    uint16 public referralCommissionRate = 100;
    // Max referral commission rate: 10%.
    uint16 public constant MAXIMUM_REFERRAL_COMMISSION_RATE = 1000;

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event ReferralCommissionPaid(address indexed user, address indexed referrer, uint256 commissionAmount);
    event EmergencyWithdraw(
        address indexed user,
        uint256 indexed pid,
        uint256 amount
    );

    constructor(
        STLYToken _STLY,
        address _devaddr,
        address _refAddr,
        address _safuaddr,
        uint256 _STLYPerBlock,
        uint256 _startBlock,
        uint256 _stakingPercent,
        uint256 _devPercent,
        uint256 _refPercent,
        uint256 _safuPercent
    ) public {
        STLY = _STLY;
        devaddr = _devaddr;
        refAddr = _refAddr;
        safuaddr = _safuaddr;
        STLYPerBlock = _STLYPerBlock;
        startBlock = _startBlock;
        stakingPercent = _stakingPercent;
        devPercent = _devPercent;
        refPercent = _refPercent;
        safuPercent = _safuPercent;
        lastBlockDevWithdraw = _startBlock;
        lastBlockRefWithdraw = _startBlock;
        
        // staking pool
        poolInfo.push(PoolInfo({
            lpToken: _STLY,
            allocPoint: 1000,
            lastRewardBlock: startBlock,
            accSTLYPerShare: 0
        }));

        totalAllocPoint = 1000;

    }

    function updateMultiplier(uint256 multiplierNumber) public onlyOwner {
        BONUS_MULTIPLIER = multiplierNumber;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    function withdrawRefFee() public {
        if (lastBlockRefWithdraw < block.number) {
            uint256 multiplier = getMultiplier(lastBlockRefWithdraw, block.number);
            uint256 STLYReward = multiplier.mul(STLYPerBlock);
            STLY.mint(refAddr, STLYReward.mul(refPercent).div(percentDec));
            lastBlockRefWithdraw = block.number;
        }
    }

    function withdrawDevFee() public{
        require(lastBlockDevWithdraw < block.number, 'wait for new block');
        uint256 multiplier = getMultiplier(lastBlockDevWithdraw, block.number);
        uint256 STLYReward = multiplier.mul(STLYPerBlock);
        STLY.mint(devaddr, STLYReward.mul(devPercent).div(percentDec));
        STLY.mint(safuaddr, STLYReward.mul(safuPercent).div(percentDec));
        lastBlockDevWithdraw = block.number;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    // XXX DO NOT add the same LP token more than once. Rewards will be messed up if you do.
    function add( uint256 _allocPoint, IBEP20 _lpToken, bool _withUpdate ) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        poolInfo.push(
            PoolInfo({
                lpToken: _lpToken,
                allocPoint: _allocPoint,
                lastRewardBlock: lastRewardBlock,
                accSTLYPerShare: 0
            })
        );
    }

    // Update the given pool's STLY allocation point. Can only be called by the owner.
    function set( uint256 _pid, uint256 _allocPoint, bool _withUpdate) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        totalAllocPoint = totalAllocPoint.sub(poolInfo[_pid].allocPoint).add(_allocPoint);
        poolInfo[_pid].allocPoint = _allocPoint;
    }

    // Set the migrator contract. Can only be called by the owner.
    function setMigrator(IMigratorChef _migrator) public onlyOwner {
        migrator = _migrator;
    }

    // Migrate lp token to another lp contract. Can be called by anyone. We trust that migrator contract is good.
    function migrate(uint256 _pid) public {
        require(address(migrator) != address(0), "migrate: no migrator");
        PoolInfo storage pool = poolInfo[_pid];
        IBEP20 lpToken = pool.lpToken;
        uint256 bal = lpToken.balanceOf(address(this));
        lpToken.safeApprove(address(migrator), bal);
        IBEP20 newLpToken = migrator.migrate(lpToken);
        require(bal == newLpToken.balanceOf(address(this)), "migrate: bad");
        pool.lpToken = newLpToken;
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
         return _to.sub(_from).mul(BONUS_MULTIPLIER);
    }

    // View function to see pending STLYs on frontend.
    function pendingSTLY(uint256 _pid, address _user) external view returns (uint256){
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accSTLYPerShare = pool.accSTLYPerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (_pid == 0){
            lpSupply = depositedStly;
        }
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 STLYReward = multiplier.mul(STLYPerBlock).mul(pool.allocPoint).div(totalAllocPoint).mul(stakingPercent).div(percentDec);
            accSTLYPerShare = accSTLYPerShare.add(STLYReward.mul(1e12).div(lpSupply));
        }
        return user.amount.mul(accSTLYPerShare).div(1e12).sub(user.rewardDebt);
    }

    // Update reward vairables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (_pid == 0){
            lpSupply = depositedStly;
        }
        if (lpSupply <= 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 STLYReward = multiplier.mul(STLYPerBlock).mul(pool.allocPoint).div(totalAllocPoint).mul(stakingPercent).div(percentDec);
        STLY.mint(address(this), STLYReward);
        pool.accSTLYPerShare = pool.accSTLYPerShare.add(STLYReward.mul(1e12).div(lpSupply));
        pool.lastRewardBlock = block.number;
    }

    // Deposit LP tokens to MasterChef for STLY allocation.
    function deposit(uint256 _pid, uint256 _amount, address _referrer) public {

        require (_pid != 0, 'deposit STLY by staking');

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (_amount > 0 && address(starlyReferral) != address(0) && _referrer != address(0) && _referrer != msg.sender) {
            starlyReferral.recordReferral(msg.sender, _referrer);
        }
        if (user.amount > 0) {
            uint256 pending = user.amount.mul(pool.accSTLYPerShare).div(1e12).sub(user.rewardDebt);
            safeSTLYTransfer(msg.sender, pending);
            payReferralCommission(msg.sender, pending);
        }
        pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
        user.amount = user.amount.add(_amount);
        user.rewardDebt = user.amount.mul(pool.accSTLYPerShare).div(1e12);
        emit Deposit(msg.sender, _pid, _amount);
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256 _pid, uint256 _amount) public {

        require (_pid != 0, 'withdraw STLY by unstaking');

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");
        updatePool(_pid);
        uint256 pending = user.amount.mul(pool.accSTLYPerShare).div(1e12).sub(user.rewardDebt);
        safeSTLYTransfer(msg.sender, pending);
        payReferralCommission(msg.sender, pending);
        user.amount = user.amount.sub(_amount);
        user.rewardDebt = user.amount.mul(pool.accSTLYPerShare).div(1e12);
        pool.lpToken.safeTransfer(address(msg.sender), _amount);
        emit Withdraw(msg.sender, _pid, _amount);
    }

    // Stake STLY tokens to MasterChef
    function enterStaking(uint256 _amount) public {
        PoolInfo storage pool = poolInfo[0];
        UserInfo storage user = userInfo[0][msg.sender];
        updatePool(0);
        if (user.amount > 0) {
            uint256 pending = user.amount.mul(pool.accSTLYPerShare).div(1e12).sub(user.rewardDebt);
            if(pending > 0) {
                safeSTLYTransfer(msg.sender, pending);
            }
        }
        if(_amount > 0) {
            pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
            user.amount = user.amount.add(_amount);
            depositedStly = depositedStly.add(_amount);
        }
        user.rewardDebt = user.amount.mul(pool.accSTLYPerShare).div(1e12);
        emit Deposit(msg.sender, 0, _amount);
    }

    // Withdraw STLY tokens from STAKING.
    function leaveStaking(uint256 _amount) public {
        PoolInfo storage pool = poolInfo[0];
        UserInfo storage user = userInfo[0][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");
        updatePool(0);
        uint256 pending = user.amount.mul(pool.accSTLYPerShare).div(1e12).sub(user.rewardDebt);
        if(pending > 0) {
            safeSTLYTransfer(msg.sender, pending);
        }
        if(_amount > 0) {
            user.amount = user.amount.sub(_amount);
            pool.lpToken.safeTransfer(address(msg.sender), _amount);
            depositedStly = depositedStly.sub(_amount);
        }
        user.rewardDebt = user.amount.mul(pool.accSTLYPerShare).div(1e12);
        emit Withdraw(msg.sender, 0, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        pool.lpToken.safeTransfer(address(msg.sender), user.amount);
        emit EmergencyWithdraw(msg.sender, _pid, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
    }

    // Safe STLY transfer function, just in case if rounding error causes pool to not have enough STLYs.
    function safeSTLYTransfer(address _to, uint256 _amount) internal {
        uint256 STLYBal = STLY.balanceOf(address(this));
        if (_amount > STLYBal) {
            STLY.transfer(_to, STLYBal);
        } else {
            STLY.transfer(_to, _amount);
        }
    }

    
    function setDevAddress(address _devaddr) public onlyOwner {
        devaddr = _devaddr;
    }
    function setRefAddress(address _refaddr) public onlyOwner {
        refAddr = _refaddr;
    }
    function setSafuAddress(address _safuaddr) public onlyOwner{
        safuaddr = _safuaddr;
    }
    function updateStlyPerBlock(uint256 newAmount) public onlyOwner {
        require(newAmount <= 21 * 1e18, 'Max per block 21 STLY');
        require(newAmount >= 0 * 1e18, 'Min per block 0 STLY');
        STLYPerBlock = newAmount;
    }

     // Update the starly referral contract address by the owner
    function setStarlyReferral(IStarlyReferral _starlyReferral) public onlyOwner {
        starlyReferral = _starlyReferral;
    }

    // Update referral commission rate by the owner
    function setReferralCommissionRate(uint16 _referralCommissionRate) public onlyOwner {
        require(_referralCommissionRate <= MAXIMUM_REFERRAL_COMMISSION_RATE, "setReferralCommissionRate: invalid referral commission rate basis points");
        referralCommissionRate = _referralCommissionRate;
    }

    // Pay referral commission to the referrer who referred this user.
    function payReferralCommission(address _user, uint256 _pending) internal {
        if (address(starlyReferral) != address(0) && referralCommissionRate > 0) {
            address referrer = starlyReferral.getReferrer(_user);
            uint256 commissionAmount = _pending.mul(referralCommissionRate).div(10000);
            if (referrer != address(0) && commissionAmount > 0) {
                if (STLY.balanceOf(refAddr) < commissionAmount) {
                    withdrawRefFee();
                }
                uint256 refSTLYBal = STLY.balanceOf(refAddr);
                uint256 actualCommissionAmount = commissionAmount;
                if (commissionAmount > refSTLYBal) {
                    STLY.transferFrom(refAddr, referrer, refSTLYBal);
                    actualCommissionAmount = refSTLYBal;
                } else {
                    STLY.transferFrom(refAddr, referrer, commissionAmount);
                }
                starlyReferral.recordReferralCommission(referrer, actualCommissionAmount);
                emit ReferralCommissionPaid(_user, referrer, actualCommissionAmount);
            }
        }
    }
}