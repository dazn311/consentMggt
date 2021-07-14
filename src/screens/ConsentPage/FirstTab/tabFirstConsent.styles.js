const styleConsent = {
  display: "flex",
  flexWrap: "nowrap",
  position: "relative",
  flexDirection: window.innerWidth < 500 ? "column" : "row",
  justifyContent: "flex-start",
};

const styleOrg = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  border: "2px solid #4D584D",
  // minWidth: 350,
  // width: 350,
  minHeight: 450,
  height: 'min-content',
  marginRight: 8,
  position: "relative",
  overflow: "unset",
  transition: "all .5s ease-in-out",
};
const styleIconButton = {
  position: "absolute",
  top: 4,
  right: 4,
  padding: 4,
  cursor: "pointer",
  zIndex: 1,
  transform: "rotate(45deg)",
};
const styleCardMapInfo = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  minWidth: 560,
  width: 560,
  minHeight: 550,
  position: "relative",
  overflow: "unset",
};

const styleEventsObj = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  position: "relative",
  overflow: "auto",
  // border: '1px solid red',
  // minWidth: 100,
  // width: 350,
  minHeight: 100,
  height: 550,
  maxHeight: 620,
  marginRight: 4,
  marginLeft: 4,
  transition: "all .5s ease-in-out",
  border: "1px solid #4D584D"
};

const styleChatEvents = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  position: "relative",
  overflow: "unset",
  border: "2px solid #4D584D",
  minWidth: 350,
  width: 350,
  height: 620,
  maxHeight: 620,
  transition: "all .5s ease-in-out",
};

export { styleConsent, styleOrg, styleCardMapInfo, styleEventsObj, styleChatEvents, styleIconButton };
