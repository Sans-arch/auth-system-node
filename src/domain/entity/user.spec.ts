import User from "./user";

describe("User unit test suite", () => {
  it("should create a new user without passing existing id", () => {
    const input = {
      name: "John",
      email: "john@email.com",
      password: "123",
    };

    const user = new User(input);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe(input.name);
    expect(user.email).toBe(input.email);
    expect(user.password).toBeDefined();
    expect(user.created_at).toBeDefined();
    expect(user.updated_at).toBeDefined();
  });

  it("should create a new user passing id", () => {
    const input = {
      id: "fad0342d-1623-49c1-a7ee-91f94983ceaf",
      name: "John",
      email: "john@email.com",
      password: "123",
    };

    const user = new User(input);

    expect(user).toBeDefined();
    expect(user.id).toBe(input.id);
    expect(user.name).toBe(input.name);
    expect(user.email).toBe(input.email);
    expect(user.password).toBeDefined();
    expect(user.created_at).toBeDefined();
    expect(user.updated_at).toBeDefined();
  });

  it("should not create user with invalid id", () => {
    const input = {
      id: "fad0342d-1623",
      name: "John",
      email: "john@email.com",
      password: "123",
    };

    expect(() => {
      new User(input);
    }).toThrow("ID is invalid");
  });

  it("should not create user without empty name", () => {
    const input = {
      name: "",
      email: "",
      password: "123",
    };

    expect(() => {
      new User(input);
    }).toThrow("Name is required");
  });

  it("should not create user without empty email", () => {
    const input = {
      name: "John",
      email: "",
      password: "123",
    };

    expect(() => {
      new User(input);
    }).toThrow("Email is required");
  });

  it("should not create user with invalid email", () => {
    const input = {
      name: "John",
      email: "email",
      password: "123",
    };

    expect(() => {
      new User(input);
    }).toThrow("Email is required");
  });

  it("should throw error when password is empty string", () => {
    const input = {
      name: "John",
      email: "email@email.com",
      password: "",
    };

    expect(() => {
      new User(input);
    }).toThrow("Password is required");
  });

  it("should change name", () => {
    const input = {
      name: "John",
      email: "john@email.com",
      password: "123",
    };

    const user = new User(input);

    expect(user).toBeDefined();
    expect(user.name).toBe(input.name);

    user.changeName("Gerald");

    expect(user.name).toBe("Gerald");
  });

  it("should change email", () => {
    const input = {
      name: "John",
      email: "john@email.com",
      password: "123",
    };

    const user = new User(input);

    expect(user).toBeDefined();
    expect(user.email).toBe(input.email);

    user.changeEmail("gerald@gerald.com");

    expect(user.email).toBe("gerald@gerald.com");
  });

  it("should change email", () => {
    const input = {
      name: "John",
      email: "john@email.com",
      password: "123",
    };

    const user = new User(input);

    expect(user).toBeDefined();
    expect(user.email).toBe(input.email);

    user.changeEmail("gerald@gerald.com");

    expect(user.email).toBe("gerald@gerald.com");
  });
});
