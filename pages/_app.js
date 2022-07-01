import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav>
        <div className='nav-bar'>
          <div className='nav-bar__left-section'>
            <h2 className='nav-bar__website-title'>Austin Busting Website</h2>
          </div>
          <div className='nav-bar__right-section'>
            <a className='nav-bar__link nav-bar__link--margin-right' href='/about'>About Me</a>
            <a className='nav-bar__link nav-bar__link--margin-right' href=''>Projects</a>
            <a className='nav-bar__link' href=''>Contact Me</a>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </>
  )

}

export default MyApp
