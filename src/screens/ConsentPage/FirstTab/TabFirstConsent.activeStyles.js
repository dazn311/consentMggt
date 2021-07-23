const styleOrgBy = (isOpened) => {
  return {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    minHeight: 450,
    height: 'min-content',
    marginRight: 8,
    position: "relative",
    overflow: "unset",
    transition: "all .5s ease-in-out",
    maxWidth: isOpened.lPanel ? 400 : 98, border: isOpened.lPanel ? '1px solid rgb(77, 88, 77)' : '1px solid #607d8b'
  }
}
export default styleOrgBy