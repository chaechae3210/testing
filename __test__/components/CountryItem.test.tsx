import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CountryItem from "@/components/CountryItem/CountryItem";
import { useRouter } from "next/router";

const mockProps = {
  code: "KOR",
  commonName: "South Korea",
  flagEmoji: "🇰🇷",
  flagImg: "https://flagcdn.com/w320/kr.png",
  capital: ["Seoul"],
  region: "Asia",
  population: 51780579,
};

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("CountryItem Component", () => {
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it("CountryItem에 프롭스를 넘겼을 때 국가 정보가 올바르게 렌더링 됨.", () => {
    render(<CountryItem {...mockProps} />);

    expect(screen.getByText("🇰🇷 South Korea")).toBeInTheDocument();
    expect(screen.getByText("지역 : Asia")).toBeInTheDocument();
    expect(screen.getByText("수도 : Seoul")).toBeInTheDocument();
    expect(screen.getByText("인구 : 51780579")).toBeInTheDocument();
  });

  it("li를 클릭하면 국가 정보 디테일 페이지로 push됨", async () => {
    render(<CountryItem {...mockProps} />);
    const container = screen.getByRole("listitem");
    await userEvent.click(container);

    expect(mockRouterPush).toHaveBeenCalledWith(`/country/${mockProps.code}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
