export interface User {
  id?: number;
  name: string;
  email: string;
  username?: string;
}

export interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

export interface FormData {
  [key: string]: string;
}

export class TestDataBuilder {
  static createUser(overrides?: Partial<User>): User {
    return {
      name: "Test User",
      email: "test@example.com",
      username: "testuser",
      ...overrides,
    };
  }

  static createPost(overrides?: Partial<Post>): Post {
    return {
      title: "Test Post",
      body: "This is a test post body",
      userId: 1,
      ...overrides,
    };
  }

  static parseTable(table: Array<{ [key: string]: string }>): FormData {
    const data: FormData = {};
    table.forEach((row) => {
      Object.assign(data, row);
    });
    return data;
  }
}
