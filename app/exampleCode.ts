export const codeString = `
  // Define a basic user object
  class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    
      // Return user's greeting
      greet() {
        return "Hello, my name is" + this.name};
      }
    
      // Check if the user is an adult
      isAdult() {
        return this.age >= 18 ? true : false;
      }
    }
    
    // Create a new user instance
    const user1 = new User('Alice', 25);
    console.log(user1.greet());  // Outputs: Hello, my name is Alice!
  `;
