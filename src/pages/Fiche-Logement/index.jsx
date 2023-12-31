import { useParams, useNavigate } from 'react-router-dom'
import data from '../../data/data.json'
import style from './fLogement.module.scss'
import Collapse from "../../components/collapse";
import Tag from '../../components/tag'
import Stars from './Stars'
import Profile from './Profile'
import Carousel from '../../components/carousel';
import { CurrentPageContext } from "../../utils/context"
import { useContext, useEffect } from "react"


function FLogement() {
  const navigate = useNavigate();  
  const { updateCurrentPage } = useContext(CurrentPageContext)  
  const { locationId } = useParams()
  const location = data.filter((e) => e.id === locationId)[0]

  useEffect(() => {
    if (location === undefined) {
      navigate("*");
    } else {
      updateCurrentPage('flogement') 
      document.title = `Kasa - ${ location.title }`   
    }
  })

  if (location !== undefined) {
    return (
      <div className={ style.fLogement__content }>
        <Carousel
          title={ location.title }
          pictures={ location.pictures }
        />

        <div className={ style.txtContainer }>
          <div className={ style.txtContainer__left }>
            <h1>{ location.title }</h1>
            <span>{ location.location }</span>
            <div className={ style.tagsContainer }>
              { location.tags.map((e) => (
                <Tag tag={ e } key={ e } />
              ))}
            </div>
          </div>

          <div className={ style.txtContainer__right }>
            <Profile 
              name={ location.host.name } 
              picture={ location.host.picture }
            />
            <Stars rating={ location.rating } />
          </div>
        </div>
          
        <div className={ style.collapseContainer }>
          <Collapse
            category="Description"
            details={ location.description }
            isLittleLabel={ true }
          />
          <Collapse
            category="Equipements"
            details={ location.equipments.map((e, index) => (
              <li key={index}>{ e }</li>
            )) }
            isLittleLabel={ true }
          />          
        </div>
      </div>
    )    
  }

}
  
  export default FLogement