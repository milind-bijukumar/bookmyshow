import brandLogo from '../../img/brand-logo.png'

const Footer= () =>{
    return (
        <div className="footer-cont">
            <div className='logo-cont'>
                <img src={brandLogo} alt="brand-logo" width="100rem"/>
            </div>
            <hr style={{backgroundColor:"grey", width:"30rem"}}/>
            <div className="copyright-content mt-3">
            <p className="">© 2025 Bigtree Entertainment Pvt. Ltd. All Rights Reserved.  
                <br/>The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.  
            </p>
            </div>
        </div>
    )
}
export default Footer;