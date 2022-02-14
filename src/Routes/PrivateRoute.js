function PrivateRoute(props) {
  let Navigate = props.Navigate;
  console.log(props);
  let auth = JSON.parse(localStorage.getItem("isLogin"));

  return auth ? props.children : <Navigate to="/login" />;
}

export default PrivateRoute;
