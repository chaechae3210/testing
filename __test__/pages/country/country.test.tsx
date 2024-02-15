import Country from "@/pages/country/[code]";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockCountryData = {
  code: "KOR",
  commonName: "South Korea",
  officialName: "Republic of Korea",
  flagEmoji: "🇰🇷",
  flagImg: "https://flagcdn.com/w320/kr.png",
  capital: ["Seoul"],
  region: "Asia",
  population: 51780579,
  googleMapURL: "https://goo.gl/maps/7ecjaJXefjAQhxjGA",
};

describe("Country 컴포넌트", () => {
  it("isFallback이 true일 때 'Loading...' 메시지가 표시됨", () => {
    (useRouter as jest.Mock).mockReturnValue({
      isFallback: true,
    });

    render(<Country country={null} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("isFallback이 false이고 country가 null일 때 '존재하지 않는 국가입니다.' 메시지가 표시됨", () => {
    (useRouter as jest.Mock).mockReturnValue({
      isFallback: false,
    });

    render(<Country country={null} />);
    expect(screen.getByText("존재하지 않는 국가입니다.")).toBeInTheDocument();
  });

  it("유효한 country prop이 제공될 때 국가 정보가 정확하게 표시됨", () => {
    (useRouter as jest.Mock).mockReturnValue({
      isFallback: false,
    });

    render(<Country country={mockCountryData} />);
    expect(screen.getByText(mockCountryData.capital[0])).toBeInTheDocument();
    expect(screen.getByText(mockCountryData.region)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCountryData.officialName}`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: mockCountryData.googleMapURL })
    ).toHaveAttribute("href", mockCountryData.googleMapURL);
  });
});
