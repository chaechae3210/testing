import Country from "@/pages/country/[code]";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

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
  it("isFallback이 true일 때는 'Loading...' 메시지가 표시됨", () => {
    // isFallback 상태 정의
    mockRouter.isFallback = true;

    // isFallback의 상태가 true 이기 때문에 country 데이터를 프롭스로 넘기더라도
    render(<Country country={mockCountryData} />);
    // 화면엔 "Loading..." 메세지가 보일 것으로 기대
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("isFallback이 false이고 country가 null일 때 '존재하지 않는 국가입니다.' 메시지가 표시됨", () => {
    mockRouter.isFallback = false;

    // 제대로 된 국가 데이터를 넘기지 않았으므로 존재X 국가 메세지가 표시될 것으로 기대
    render(<Country country={null} />);
    expect(screen.getByText("존재하지 않는 국가입니다.")).toBeInTheDocument();
  });

  it("isFallback이 false이고 유효한 country prop이 제공될 때 국가 정보가 정확하게 표시됨", () => {
    mockRouter.isFallback = false;

    render(<Country country={mockCountryData} />);
    expect(screen.getByText(mockCountryData.capital[0])).toBeInTheDocument();
    expect(screen.getByText(mockCountryData.region)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCountryData.officialName}`)
    ).toBeInTheDocument();
    // link 롤을 가진 name : mockCountryData.googleMapURL인 요소의
    // href 속성이 mockCountryData.googleMapURL일 것이라 기대
    expect(
      screen.getByRole("link", { name: mockCountryData.googleMapURL })
    ).toHaveAttribute("href", mockCountryData.googleMapURL);
  });
});
