import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook, faTwitter, faWhatsapp, faSlack } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="w-full bg-black text-white p-4 pb-0">
            <div className="flex justify-evenly flex-wrap gap-10 mb-6">
                <div className="flex flex-col max-w-[16rem] gap-3">
                    <span className='inline-flex items-center gap-2 max-w-lg mr-3'>
                        <FontAwesomeIcon icon={faStar} className='text-blue-500 text-x h-10' />
                        <span className='font-bold'>Life<span className='text-blue-500'>Style</span>Leverage</span>
                    </span>
                    <p className="bg-gray-900 p-4 rounded-xl">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi necessitatibus recusandae nihil optio. Voluptatum, iusto obcaecati. Doloribus
                        facere libero sint labore perspiciatis itaque error, autem animi. Placeat ipsa aut unde!
                    </p>
                </div>
                <div>
                    <h2 className="font-medium">Usefull Links</h2>
                    <ul className="">
                        <li className="mb-2 before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700"><a href="#">listing</a></li>
                        <li className="mb-2 before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700"><a href="#">listing</a></li>
                        <li className="mb-2 before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700"><a href="#">listing</a></li>
                        <li className="mb-2 before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700"><a href="#">listing</a></li>
                        <li className="mb-2 before:content-['•'] before:mr-2 before:text-2xl before:text-blue-700"><a href="#">listing</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-medium">Socials</h2>
                    <div className="flex items-center justify-center gap-4">
                        <a href='#' className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-950 hover:bg-indigo-950" >
                            <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-blue-600" />
                        </a >
                        <a href='#' className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-950 hover:bg-indigo-950" >
                            <FontAwesomeIcon icon={faFacebook} className="h-5 w-5 text-blue-600" />
                        </a >
                        <a href='#' className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-950 hover:bg-indigo-950" >
                            <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5 text-blue-600" />
                        </a >
                        <a href='#' className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-950 hover:bg-indigo-950" >
                            <FontAwesomeIcon icon={faTwitter} className="h-5 w-5 text-blue-600" />
                        </a >
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 flex justify-center items-center p-4 rounded-t-xl">
                Copyrights 2024 rights reserved
            </div>
        </footer>
    )
}


export default Footer;