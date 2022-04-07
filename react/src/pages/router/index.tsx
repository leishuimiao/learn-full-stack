import { Component, PropsWithChildren, useState } from 'react';
import Page from '@/components/Page'
import { Link, Router, Route, Switch, RouteFuncProps, withRouter, useHistory, useLoaction, useMatch, useParams, Redirect, Prompt } from './my-router';
import { createBrowserHistory } from 'history';
import './index.css';

// function Home() {
//   return <h1>Home Children View</h1>;
// }
function HomeComponent(props: PropsWithChildren<Partial<RouteFuncProps>>) {
  console.log(props, 'props')
  return <h1>Home Compontent View</h1>;
}
function HomeRender() {
  return <h1>Home Render View</h1>;
}

@(withRouter as any)
class List extends Component {
  render() {
    console.log(this.props, 'props')
    return <h1>List View</h1>;;
  }
}

function Detail(props: RouteFuncProps<'id'>) {
  console.log(props, 'props')
  return <h1>Detail View - id: {props.match.params.id}</h1>;
}

function About() {
  const history = useHistory()
  const location = useLoaction()
  const match = useMatch<'name'>()
  const params = useParams<'name'>()
  console.log(location, 'location')
  console.log(match, 'match')
  console.log(params, 'params')

  return <div>
      <h1>关于我们</h1>
      <button onClick={() => history.push('/contact')}>跳转到联系我们页面</button>
  </div>
}

function Contact(props: Partial<RouteFuncProps>) {
  console.log(props, 'props')
  const [when, setWhen] = useState(true);
  return <div>
    <h1>联系我们</h1>
    <button onClick={() => setWhen(!when)}>改变prompt状态</button>
    <Prompt message={(location, action) => `目标路径${location.pathname}，方向${action}，确定离开吗？`} when={when} />
  </div>
}

function Welcome() {
  return <Redirect to="/welcomeing" />
}

function PageNotFound(props: PropsWithChildren<Partial<RouteFuncProps>>) {
  console.log(props, 'props')
  return <h1>404 - Page not found!</h1>
}

const history = createBrowserHistory()

export default function RouterIndex() {
  return (
    <Page title="Router" className="router">
      <Router
        history={history}
        basename='/router'
      >
        <Link to="/">首页</Link>
        <Link to="/list/hot">列表</Link>
        <Link to="/detail/666">详情</Link>
        <Link to="/about/company">关于</Link>
        <Link to="/contact">联系</Link>
        <Link to="/welcome">重定向</Link>
        <Link to="/pagenotfound">404</Link>
        <Switch>
          <Route
            path="/"
            component={HomeComponent}
            render={<HomeRender />}
          >
            {/* <Home /> */}
          </Route>
          <Route path="/list/:type">
            <List />
          </Route>
          <Route path="/detail/:id" render={(props) => <Detail {...props} />} />
          <Route path="/about/:name" render={<About />} />
          <Route path="/contact">
            {(props) => <Contact {...props} />}
          </Route>
          <Route path="/welcome" component={Welcome} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Page>
  );
}
