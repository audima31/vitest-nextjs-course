import "@testing-library/jest-dom/vitest"; // Supaya kita bisa menggunakan matcher dari jest-dom seperti toBeInTheDocument dan toHaveTextContent

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./__mocks__/node.js";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.resetAllMocks();
});
afterAll(() => server.close());

const push = vi.fn();
const replace = vi.fn();
const back = vi.fn();
const forward = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
    replace,
    back,
    forward,
    refresh,
  }),
  useParams: vi.fn(),
}));
