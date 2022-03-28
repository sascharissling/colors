import { ColorType, useGetColors } from "./hooks/useGetColors";
import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { GlobalStyle } from "./globalStyles";
import { ThreeDots } from "react-loading-icons";

const Input = styled.input`
  width: 100%;
  height: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 1px solid lightgray;
`;

const ColorsList = styled.ul`
  list-style: none;
  margin: 1rem 0 0 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const Sample = styled.span<{
  hex: ColorType["hex"];
}>`
  background: ${(props) => props.hex};
  display: inline-block;
  margin-right: 5px;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

const Color = styled.li`
  margin: 0.5rem;
  border: 1px solid lightgray;
  width: max-content;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
`;

const FallbackMessage = styled.span`
  width: 100%;
  height: 10rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppHeadline = styled.h1`
  text-align: center;
`;

const ColorsCount = styled.span<{
  colorsCount: number;
}>`
  background: ${(props) =>
    props.colorsCount > 0 ? "lightgreen" : "brightred"};
  position: absolute;
  right: 1rem;
  transform: translateY(-50%);
  top: 50%;
  border-radius: 50%;
  padding: 0.25rem;
`;

const InputWrapper = styled.span`
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const [filter, setFilter] = useState<ColorType["name"]>("");
  const { filteredColors, loading, error } = useGetColors(filter);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }

  if (error) {
    return <p>Sorry, our service is currently not available</p>;
  }

  return (
    <main>
      <GlobalStyle />
      <AppHeadline>CSS Colors</AppHeadline>
      {loading ? (
        <LoadingWrapper>
          <ThreeDots stroke="#333" />
        </LoadingWrapper>
      ) : (
        <>
          <Label>search for colors here</Label>
          <InputWrapper>
            <Input
              value={filter}
              type="text"
              name="color-filter"
              onChange={handleInputChange}
              placeholder="E.g.: green"
            />
            {filter !== "" && filteredColors && (
              <ColorsCount colorsCount={filteredColors.length}>
                {filteredColors && filteredColors.length}
              </ColorsCount>
            )}
          </InputWrapper>
          {filteredColors && filteredColors.length > 0 ? (
            <>
              <ColorsList>
                {filteredColors.map((color) => (
                  <Color key={color.id}>
                    <Sample hex={color.hex} />
                    {color.name + " " + color.hex}
                  </Color>
                ))}
              </ColorsList>
            </>
          ) : (
            <FallbackMessage>Sorry, no colors could be found</FallbackMessage>
          )}
        </>
      )}
    </main>
  );
}
