const UnauthorizedPage = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>You are not authorized to view this page.</h1>
    </div>
  );
};

export default UnauthorizedPage;
