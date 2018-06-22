pragma solidity ^0.4.17;

contract ElectionFactory {

    address[] public deployedElections;


    function createElection(string title) public {
        address newElection = new Election(title, msg.sender);

        deployedElections.push(newElection);
    }

    function getDeployedElections() public view returns (address[]) {
        return deployedElections;
    }

}

contract Election {

    struct Ballot {
        string description;
        uint votes;
    }

    address public manager;
    uint public voterCount;
    address[] public voters;
    string electionTitle;
    uint public ballotCount;
    Ballot[] public ballots;
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Election(string title,address creator) public {
        manager = creator;
        electionTitle = title;
    }

    function castVote(uint index,  uint vote) public payable {
        Ballot storage ballot = ballots[index];
        ballot.votes += vote;
        voterCount += 1;
        voters.push(msg.sender);
    }

    function distribute() public {
        require(msg.sender == manager);

        for (var i = 0; i < voters.length; i++) {
            voters[i].transfer(this.balance / voterCount);
        }
    }

    function getInfo() public view returns (
        string, uint, address, uint
    ) {
        return (
            electionTitle,
            voterCount,
            manager,
            ballotCount
        );
    }


    function createBallot(string description) public {
        Ballot memory newBallot = Ballot({
            description: description,
            votes: 0
        });

        ballots.push(newBallot);
        ballotCount += 1;
    }



    function destroy() public {
        require(msg.sender == manager);
        selfdestruct(manager);
    }
}
