function requireAll(r) {
  console.log(r)
  r.keys().forEach(r)
}

requireAll(require.context('./', true, /\.svg$/))
