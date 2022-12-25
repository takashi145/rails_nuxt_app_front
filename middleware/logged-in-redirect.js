export default ({ $auth, store, route, redirect }) => {
  // ログイン済ユーザーをリダイレクトさせる
  const redirectPaths = store.state.loggedIn.redirectPath
  if ($auth.loggedIn() && redirectPaths.includes(route.name)) {
    return redirect(store.state.loggedIn.homePath)
  }
}