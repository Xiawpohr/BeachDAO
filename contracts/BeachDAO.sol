pragma solidity >=0.4.22 <0.6.0;

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0)
            return 0;
        uint256 c = a * b;
        require(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0);
        uint256 c = a / b;
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;
        return c;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);
        return c;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}


contract ERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) internal _balances;
    mapping (address => mapping (address => uint256)) internal _allowed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    uint256 internal _totalSupply;

    /**
    * @dev Total number of tokens in existence
    */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param owner The address to query the balance of.
    * @return A uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    /**
    * @dev Function to check the amount of tokens that an owner allowed to a spender.
    * @param owner address The address which owns the funds.
    * @param spender address The address which will spend the funds.
    * @return A uint256 specifying the amount of tokens still available for the spender.
    */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowed[owner][spender];
    }

    /**
    * @dev Transfer token to a specified address
    * @param to The address to transfer to.
    * @param value The amount to be transferred.
    */
    function transfer(address to, uint256 value) public returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    /**
    * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
    * Beware that changing an allowance with this method brings the risk that someone may use both the old
    * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
    * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
    * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    * @param spender The address which will spend the funds.
    * @param value The amount of tokens to be spent.
    */
    function approve(address spender, uint256 value) public returns (bool) {
        _allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    /**
    * @dev Transfer tokens from one address to another.
    * Note that while this function emits an Approval event, this is not required as per the specification,
    * and other compliant implementations may not emit the event.
    * @param from address The address which you want to send tokens from
    * @param to address The address which you want to transfer to
    * @param value uint256 the amount of tokens to be transferred
    */
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        _transfer(from, to, value);
        _allowed[msg.sender][to] = _allowed[msg.sender][to].sub(value);
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0));
        _balances[from] = _balances[from].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(from, to, value);
    }

}


contract ERC20Mintable is ERC20 {
    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
        emit Mint(to, amount);
    }

    function burn(address from, uint256 amount) public {
        _burn(from, amount);
        emit Burn(from, amount);
    }

    function _mint(address to, uint256 amount) internal {
        _balances[to] = _balances[to].add(amount);
        _totalSupply = _totalSupply.add(amount);
        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal {
        _balances[from] = _balances[from].sub(amount);
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(from, address(0), amount);
    }

}


contract BeachToken is ERC20Mintable {
    constructor() public {}
}


contract owned {
    address public owner;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}


contract tokenRecipient {
    event receivedEther(address sender, uint amount);
    event receivedTokens(address _from, uint256 _value, address _token, bytes _extraData);

    function receiveApproval(address _from, uint256 _value, address _token, bytes memory _extraData) public {
        ERC20 t = ERC20(_token);
        require(t.transferFrom(_from, address(this), _value));
        emit receivedTokens(_from, _value, _token, _extraData);
    }

    function () external payable {
        emit receivedEther(msg.sender, msg.value);
    }
}


contract Activity is tokenRecipient {
    mapping (address => uint) public participientId;
    Participient[] public participients;
    uint256 public startTime;
    uint256 public checkinDuration = 1800; // 30min
    uint256 public endTime;
    bool public confirmed;
    ERC20 public token;

    event Joint(address indexed participient, bool joined);
    event Rewarded(address indexed participient, bool rewarded);

    struct Participient {
        address payable participient;
        string name;
        uint256 participatedSince;
        bool rewarded;
    }

    modifier onlyParticipients {
        require(participientId[msg.sender] != 0);
        _;
    }

    function set(address _token, uint256 _startTime, uint256 _endTime) public {
        _join(address(0), "");
        _join(msg.sender, "organization");
        token = ERC20(_token);
        startTime = _startTime;
        endTime = _endTime;
    }

    function () external payable {
        confirm();
    }

    function confirm() public {
        require(now < startTime);
        confirmed = true;
    }

    function join(string memory name) public {
        require(now < startTime);
        _join(msg.sender, name);
    }
 
    function _join(address payable attendee, string memory name) public {
        uint id = participientId[attendee];
        if (id == 0) {
            participientId[attendee] = participients.length;
            id = participients.length++;
        }
        
        Participient storage p = participients[id];
        p.participient = attendee;
        p.participatedSince = now;
        p.name = name;
        p.rewarded = false;

        emit Joint(attendee, true);
    }

    // function attend() public onlyParticipients returns (bool attended) {
    //     require(confirmed && now > startTime && now < startTime + checkinDuration);
    //     uint id = participientId[msg.sender];
    //     Participient storage p = participients[id];
    //     if (!p.attended) {
    //         p.attended = true;
    //         emit Attended(p.participient, true);
    //     }
    //     return true;
    // }

    function getRewards() public onlyParticipients returns (uint256 rewards) {
        require(confirmed && now > endTime);
        uint256 balance = token.balanceOf(address(this));
        rewards = balance / participients.length;
        uint id = participientId[msg.sender];
        Participient storage p = participients[id];

        token.transfer(p.participient, rewards);
        p.rewarded = true;
        emit Rewarded(p.participient, true);
        return rewards;
    }
}

contract EventFactory {

}

contract Membership is owned {
    mapping (address => uint) public memberId;
    Member[] public members;

    event MembershipChanged(address member, bool isMember);

    struct Member {
        address member;
        string name;
        uint memberSince;
    }

    // Modifier that allows only shareholders to vote and create new proposals
    modifier onlyMembers {
        require(memberId[msg.sender] != 0);
        _;
    }

    /**
     * Add member
     *
     * Make `targetMember` a member named `memberName`
     *
     * @param targetMember ethereum address to be added
     * @param memberName public name for that member
     */
    function addMember(address targetMember, string memory memberName) public {
        uint id = memberId[targetMember];
        if (id == 0) {
            memberId[targetMember] = members.length;
            id = members.length++;
        }

        members[id] = Member({member: targetMember, memberSince: now, name: memberName});
        emit MembershipChanged(targetMember, true);
    }

    /**
     * Remove member
     *
     * @notice Remove membership from `targetMember`
     *
     * @param targetMember ethereum address to be removed
     */
    function removeMember(address targetMember) public onlyOwner {
        require(memberId[targetMember] != 0);

        for (uint i = memberId[targetMember]; i<members.length-1; i++){
            members[i] = members[i+1];
            memberId[members[i].member] = i;
        }
        memberId[targetMember] = 0;
        delete members[members.length-1];
        members.length--;
    }
}

contract BeachDAO is tokenRecipient, Membership {
    using SafeMath for uint256;
    
    Proposal[] public proposals;
    uint public numProposals;
    ERC20Mintable public token;
    uint public totalDonation;
    uint public donationThreshold = 10000000000000000000; // 10 ether
    uint public startVoteTime;
    uint public voteDuration = 864000; // 10 days
    bool public isOpenVote;
    mapping (address => bool) voted;
    address[] voters;
    mapping (uint => uint) public proposalVotes;
    uint public winId;
    
    address public proposalTemplate = address(0x93BE3766cfd2d7CA062062bdbB0f9eBD3E40365E);

    event ProposalAdded(uint proposalID, address recipient, string description);
    event VoteOpenned(uint time);
    event Voted(uint proposalID, address voter);
    event ProposalTallied(uint proposalID, bool active);

    struct Proposal {
        address payable recipient;
        uint startTime;
        string location;
        string description;
        bool proposalPassed;
    }

    constructor(address _token) public {
        token = ERC20Mintable(_token);
        owner = msg.sender;
        // It’s necessary to add an empty first member
        addMember(address(0), "");
        // and let's add the founder, to save a step later
        addMember(owner, "founder");
    }

    function denote(string memory _name) public payable {
        totalDonation += uint(msg.value);
        
        if (totalDonation >= donationThreshold) {
            isOpenVote = true;
            startVoteTime = now;
            emit VoteOpenned(now);
        }
        
        if (memberId[msg.sender] == 0) {
            addMember(msg.sender, _name);
        }
    }
    
    function newProposal(
        uint startTime,
        uint endTime,
        string memory location,
        string memory description
    )
        public
        returns (uint proposalID)
    {
        address payable activity = address(uint160(createClone(proposalTemplate)));
        Activity(activity).set(address(token), startTime, endTime);
        
        proposalID = proposals.length++;
        Proposal storage p = proposals[proposalID];
        p.recipient = activity;
        p.startTime = startTime;
        p.location = location;
        p.description = description;
        p.proposalPassed = false;
        emit ProposalAdded(proposalID, activity, description);
        numProposals = proposalID + 1;

        return proposalID;
    }


    function vote(uint proposalNumber) public onlyMembers returns (uint votes)
    {
        require(now > startVoteTime && now < startVoteTime + voteDuration);
        require(!voted[msg.sender]);
        
        voted[msg.sender] = true;
        voters.push(msg.sender);
        proposalVotes[proposalNumber]++;
        
        if (proposalVotes[proposalNumber] > proposalVotes[winId]) {
            winId = proposalNumber;
        }
        
        emit Voted(proposalNumber, msg.sender);
        return proposalVotes[proposalNumber];
    }


    function executeProposal(uint proposalNumber) public {
        voters.length = 0;
        
        Proposal storage p = proposals[proposalNumber];
        Activity a = Activity(p.recipient);

        require(now > startVoteTime + voteDuration && proposalNumber == winId && !p.proposalPassed);

        p.proposalPassed = true;
        a.confirm();
        uint amount = totalDonation * 2000;
        token.mint(p.recipient, amount);
        totalDonation = 0;
        emit ProposalTallied(proposalNumber, p.proposalPassed);
        
        // reset votes
        for (uint i=0; i<voters.length; i++) {
            voted[voters[i]] = false;
        }
        isOpenVote = false;
        startVoteTime = 0;
        winId = 0;
        for (uint i=0; i<proposalNumber; i++) {
            proposalVotes[i] = 0;
        }
    }
    
    
    function createClone(address target) internal returns (address result) {
        bytes20 targetBytes = bytes20(target);
        assembly {
            let clone := mload(0x40)
            mstore(clone, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
            mstore(add(clone, 0x14), targetBytes)
            mstore(add(clone, 0x28), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
            result := create(0, clone, 0x37)
        }
    }
}
