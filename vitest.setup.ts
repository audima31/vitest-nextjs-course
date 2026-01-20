import "@testing-library/jest-dom/vitest"; // Supaya kita bisa menggunakan matcher dari jest-dom seperti toBeInTheDocument dan toHaveTextContent

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./__mocks__/node.js";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
