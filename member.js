function skillsMember() {
  var member = {
    name: "John",
    age: 30,
    skills: ["JavaScript", "CSS", "HTML"],
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY"
    },
    getSkills: function() {
      return this.skills;
    }
  };
  return member;
}