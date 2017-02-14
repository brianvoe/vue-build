/* global ga */
window.addEventListener('load', () => {
  const autotrackPlugins = [
    import('autotrack/lib/plugins/max-scroll-tracker'),
    import('autotrack/lib/plugins/outbound-link-tracker'),
    import('autotrack/lib/plugins/url-change-tracker'),
    import('autotrack/lib/plugins/page-visibility-tracker')
  ]

  Promise.all(autotrackPlugins).then(() => {
    ga('create', 'UA-91834289-1', 'auto')

    ga('require', 'maxScrollTracker')
    ga('require', 'outboundLinkTracker')
    ga('require', 'urlChangeTracker')
    ga('require', 'pageVisibilityTracker')

    ga('send', 'pageview')
  })
})
