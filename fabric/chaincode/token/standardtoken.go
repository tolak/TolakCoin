package token

type StandardToken struct {
	totalSupply int
	balances map[Address] int
	allowed map[Address] map[Address] int
	owner Address
}

func (t *StandardToken) BalanceOf(_owner Address) int {
	return t.balances[_owner]
}

func (t *StandardToken) Transfer(_to Address, _value int) bool {
	if t.balances[t.owner] >= _value && _value > 0 {
		t.balances[t.owner] -= _value
		t.balances[_to] += _value
		//TODO: event Transfer
	}else{
		return false
	}

	return true
}

func (t *StandardToken) TransferFrom(_from Address, _to Address, _value int) bool {
	if t.balances[_from] >= _value && t.allowed[_from][t.owner] >= _value && _value > 0 {
		t.balances[_to] += _value
		t.balances[_from] -= _value
		//t.allowed[_from][t.owner] -= _value	//Fixme: need call Approve before invoke TranserFrom
		//TODO: event Transfer
	}else{
		return false
	}

	return true
}

func (t *StandardToken) Approve(_spender Address, _value int) bool {
	m := map[Address] int{
		_spender: _value,
	}
	t.allowed[t.owner] = m
	//TODO: event Approval
	return true
}

func (t *StandardToken) Allowance(_owner Address, _spender Address) int {
	return t.allowed[_owner][_spender]
}

//invoked when token was created
func (t *StandardToken) DeliverOnce(_owner Address, _value int) int {
	t.allowed = make(map[Address]map[Address] int)
	t.balances = make(map[Address] int)
	t.balances[_owner] = _value
	return _value
}

func (t *StandardToken) Deliver(_owner Address, _value int) int {
	t.balances[_owner] = _value
	return _value
}