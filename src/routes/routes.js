import React,{useContext} from 'react';
import { Route as ReactDOMRoute, useHistory, useLocation } from 'react-router-dom';
import { UsuarioContext } from '../context/user';

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const history = useHistory();

  const {user,loading} = useContext(UsuarioContext)
  // const user = null;

  if(loading){
    return(
      <p>Carregando</p>
    )
  }
  if (!(isPrivate === !!user)) {
    history.push(isPrivate ? '/login' : '/home')
  }
  return (
    <ReactDOMRoute {...rest}
      render={(props) => {
        return (
          <Component{...props} />
        )
      }}
    />
  )
}
export default Route;