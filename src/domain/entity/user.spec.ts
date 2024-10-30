import User from "./user";

describe("User unit test suite", () => {
  it("should create a new user without passing existing id", () => {
    const input = {
      name: "John",
      email: "john@email.com",
    };

    const user = new User(input);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe(input.name);
    expect(user.email).toBe(input.email);
    expect(user.created_at).toBeDefined();
    expect(user.updated_at).toBeDefined();
  });

  it("should create a new user passing id", () => {
    const input = {
      id: "fad0342d-1623-49c1-a7ee-91f94983ceaf",
      name: "John",
      email: "john@email.com",
    };

    const user = new User(input);

    expect(user).toBeDefined();
    expect(user.id).toBe(input.id);
    expect(user.name).toBe(input.name);
    expect(user.email).toBe(input.email);
    expect(user.created_at).toBeDefined();
    expect(user.updated_at).toBeDefined();
  });
});
