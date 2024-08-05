export const pathProjection = (prefix = "", key = "path") => {
  return `...select(
    // has parent path
    defined(${prefix}parent._ref) => {
      ...(${prefix}parent-> {
        ...select(
          // has grandparent path
          defined(parent._ref) => {
            ...(parent-> {
              "${key}": select(
                // has great-grandparent path
                defined(parent._ref) => '/' + parent->slug.current + '/' + slug.current + '/' + ^.${prefix}slug.current + '/' + ^.^.${prefix}slug.current + '/',
                // grandparent
                '/' + slug.current + '/' + ^.${prefix}slug.current + '/' + ^.^.${prefix}slug.current + '/',
              )
            })
          },
          // parent
          {
            "${key}": '/' + slug.current + '/' + ^.${prefix}slug.current + '/'
          }
        )
      })
    },
    // default
    {
      "${key}": '/' + ${prefix}slug.current + '/'
    }
  )`;
};
