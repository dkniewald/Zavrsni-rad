import './locationPin.styles.scss';
import styled from "styled-components";
import { useLayer, Arrow } from "react-laag";
import React, { useState } from "react";

const StyledMarker = styled.div``;

const InfoBox = styled.div`
  padding: 1em;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const LocationPin = props => {
  const [isOpen, setOpen] = useState(false);
  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen,
    triggerOffset: 10,
    auto: true,
    overflowContainer: false,
    onOutsideClick: () => setOpen(false)
  });
  
  return (
    <>
      <StyledMarker className="pin"
        {...triggerProps}
        onClick={() => setOpen((prev) => !prev)}
      />
      {isOpen &&
        renderLayer(
          <InfoBox {...layerProps}>
            {props.name}
            <Arrow {...arrowProps} />
          </InfoBox>
        )}
    </>
  );
}

export default LocationPin;
