pragma solidity 0.4.25;

contract Election {
    
    struct Elections
    {
        uint electionId;
        string electionName;
        uint candidateCount;
    }

    struct Candidate
    {
        uint candId;
        uint electionId;
        string candName;
        uint voteCount;
    }

    struct VotedFace
    {
        
        string name;
        uint electag;
        uint count;
    }

    mapping(uint => Elections) public election;

    mapping(uint => VotedFace) public votedface;

    mapping(uint => Candidate) public candidate;

    mapping(address => bool) public voters1;

    mapping(address => bool) public voters2;

     mapping(address => bool) public voters3;

    mapping(address => bool) public voters4;

    mapping(address => bool) public voters5;

    mapping(address => bool) public voters6;


    constructor () public {
        addElections("General Secretary",3);
        // addElections("Election Two",3);
        addCandidate(1,"Arjun",0);
        // addCandidate(2,"Adesh",0);
         addCandidate(1,"Sulabh",0);
        addCandidate(1,"Shubham",0);
        // addCandidate(2,"Abhishek",0);
        // addCandidate(2,"Bhavya",0);
    }

    uint public ElectionCount;
    uint public CandidateCount;
    uint public FaceCount;

     event votedEvent (
        uint indexed _candidateId
    );


    function addFace (string memory name,uint tag) public
    {
        FaceCount++;
        votedface[FaceCount] = VotedFace(name,tag,FaceCount);
    }


    function addElections (string memory name,uint count) public
    {
        ElectionCount++;
        election[ElectionCount] = Elections(ElectionCount,name,count);

    }

    function addCandidate (uint id,string memory name,uint vote) public
    {
        CandidateCount++;
        candidate[CandidateCount]= Candidate(CandidateCount,id,name,vote);

    }

    function vote1 (uint _candidateId) public {
        // require that they haven't voted before
        
        require(!voters1[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= CandidateCount);

        // record that voter has voted
        voters1[msg.sender] = true;

        // update candidate vote Count
        candidate[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

     function vote2 (uint _candidateId) public {
        // require that they haven't voted before
        
        require(!voters2[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= CandidateCount);

        // record that voter has voted
        voters2[msg.sender] = true;

        // update candidate vote Count
        candidate[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

     function vote3 (uint _candidateId) public {
        // require that they haven't voted before
        
        require(!voters3[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= CandidateCount);

        // record that voter has voted
        voters3[msg.sender] = true;

        // update candidate vote Count
        candidate[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

     function vote4 (uint _candidateId) public {
        // require that they haven't voted before
        
        require(!voters4[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= CandidateCount);

        // record that voter has voted
        voters4[msg.sender] = true;

        // update candidate vote Count
        candidate[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

     function vote5 (uint _candidateId) public {
        // require that they haven't voted before
        
        require(!voters5[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= CandidateCount);

        // record that voter has voted
        voters5[msg.sender] = true;

        // update candidate vote Count
        candidate[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    function vote6 (uint _candidateId) public {
        // require that they haven't voted before
        
        require(!voters6[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= CandidateCount);

        // record that voter has voted
        voters6[msg.sender] = true;

        // update candidate vote Count
        candidate[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

}