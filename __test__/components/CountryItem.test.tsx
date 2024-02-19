import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CountryItem from "@/components/CountryItem/CountryItem";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const mockProps = {
  code: "KOR",
  commonName: "South Korea",
  flagEmoji: "🇰🇷",
  flagImg: "https://flagcdn.com/w320/kr.png",
  capital: ["Seoul"],
  region: "Asia",
  population: 51780579,
};

describe("CountryItem Component", () => {
  // 컴포넌트 ui 테스트
  it("CountryItem에 프롭스를 넘겼을 때 국가 정보가 올바르게 렌더링 됨.", () => {
    render(<CountryItem {...mockProps} />);

    expect(screen.getByText("🇰🇷 South Korea")).toBeInTheDocument();
    expect(screen.getByText("지역 : Asia")).toBeInTheDocument();
    expect(screen.getByText("수도 : Seoul")).toBeInTheDocument();
    expect(screen.getByText("인구 : 51780579")).toBeInTheDocument();
  });

  // 스냅샷 테스트 : 컴포넌트의 ui 변화를 테스트할 때 유용
  // 스토리북을 쓴다는 가정이면 스토리북을 통해 ui 테스트를 하는 것이 더 합리적인 것 같습니다.
  it("CountryItem 스냅샷 테스트", () => {
    const { container } = render(<CountryItem {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  // li 클릭시 push가 호출되는지에 대한 기능 단위테스트
  it("li를 클릭하면 국가 정보 디테일 페이지로 push됨", async () => {
    mockRouter.push("/");

    render(<CountryItem {...mockProps} />);
    const container = screen.getByRole("listitem");
    await userEvent.click(container);

    expect(mockRouter.asPath).toEqual(`/country/${mockProps.code}`);
  });
});
