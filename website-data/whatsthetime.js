function onCommand(event) {
  event.getChannel().sendMessage("The current date and time are: " + new Date().toString());
}
