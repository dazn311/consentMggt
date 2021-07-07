const InfoPanel = () => {
  return (
    <div style={{ borderLeft: "1px solid grey", marginLeft: 4, paddingLeft: 4 }}>
      <div style={{ backgroundColor: "#00008b78", paddingLeft: 4, paddingRight: 4, marginBottom: 3 }}>Вы инициировали</div>

      <div style={{ paddingLeft: 4, paddingRight: 4, backgroundColor: "rgb(255 152 0 / 38%)", marginBottom: 3 }}>Смежник иниц-ал</div>

      <div style={{ backgroundColor: "rgb(255 0 0 / 27%)", paddingLeft: 4, paddingRight: 4 }}>Вы сами себе создали событие</div>
    </div>
  );
};

export default InfoPanel;
