export function handleChange(event) {
  const { target: {name, value} } = event;
  console.log('hello');
  console.log('event.target.name is', event.target.name, 'and this is the this.state object', this.state);
  this.setState({ [name]: value });
}
