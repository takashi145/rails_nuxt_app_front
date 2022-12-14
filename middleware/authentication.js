export default async ({ $auth, store, route, redirect }) => {
  // リダイレクトを必要としないパス
  const notRedirectPaths = ['account', 'project']
  if (notRedirectPaths.includes(route.name)) {
    return false
  }

  // ログイン前ユーザー処理
  if (!$auth.loggedIn()) {
    await $auth.logout()

    const msg = 'まずはログインしてください'
    const color = 'info'
    store.dispatch('getToast', { msg, color })
    store.dispatch('getRememberPath', route)
    return redirect('/login')
  }
}
