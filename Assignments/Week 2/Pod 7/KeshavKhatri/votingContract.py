import smartpy as sp

class Election(sp.Contract):
    def __init__(self, candidate1, candidate2,start_time,end_time):
        self.init(candidates = sp.utils.vector([candidate1, candidate2]), votes = sp.utils.vector([0, 0]), voting_open = False, start_time = start_time, end_time = end_time, winner = sp.nat(0))

    @sp.entry_point
    def vote(self, params):
        sp.verify(sp.now <= self.data.end_time, "Voting peroid has already ended")
        sp.verify(params.candidate >= 0, "Please input a valid candidate number")
        self.data.votes[params.candidate] += 1

    @sp.entry_point
    def get_result(self, params):
        sp.verify(self.data.votes[params.candidate] >= 0)

    @sp.entry_point
    def get_winner(self):
        winner_index = sp.local('winner_index', -1)
        max_vote = -1
        with sp.for_('i', sp.range(0, sp.len(self.data.votes))) as i:
            sp.if self.data.votes[i] > max_vote:
                max_vote = self.data.votes[i]
                winner_index.value = sp.to_int(i)
        sp.verify(winner_index.value >= 0, "No winner found")
        winner = self.data.candidates[winner_index.value]

    @sp.add_test(name = "main")
    def test():
        scenario = sp.test_scenario()

        # Contract instance
        election = Election("Candidate 1", "Candidate 2", sp.timestamp(2023), sp.timestamp(2023))
        scenario += election

        # Test Case for Voting outside of voting period
        scenario.h2("Voting outside of voting period")
        scenario += election.vote(candidate=0).run(sender=sp.address("tz1abcdefghijklmnopqrstuvwxyzabcdefghij"), now=sp.timestamp(2024))
        scenario.verify(sp.failed(scenario.last_result))

         # Test Case for Candidate 1
        scenario.h2("Voting for Candidate 1")
        scenario += election.vote(candidate=0).run()
        scenario += election.get_result(candidate=0)
        scenario.verify(election.data.votes[0] == 1)

        # Test Case for invalid input
        scenario += election.vote(candidate=-1).run()
