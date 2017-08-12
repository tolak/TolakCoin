package token

type TolakCoin struct {
	name string           //fancy name: eg Simon Bucks
	decimals uint8        //How many decimals to show. ie. There could 1000 base units with 3 decimals. Meaning 0.980 SBX = 980 base units. It's like comparing 1 wei to 1 ether.
	symbol string         //An identifier: eg SBX
	version  string       //human 0.1 standard. Just an arbitrary versioning scheme.
	Token *StandardToken	//standard token interfaces
}

func (t *TolakCoin) Init(_name string, _decimals uint8, _symbol string, _version string, _amount int, _owner string) bool {
	t.name = _name
	t.decimals = _decimals
	t.symbol = _symbol
	t.version = _version
	t.Token = new(StandardToken)
	t.Token.totalSupply = _amount
	t.Token.owner = Address(_owner)
	if t.Token.DeliverOnce(t.Token.owner, _amount) == _amount{
		return true
	}else{
		return false
	}
}