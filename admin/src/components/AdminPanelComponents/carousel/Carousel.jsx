import { useState } from 'react';
import {Helmet} from "react-helmet";
import AddEditCarouselItem from './AddEditCarouselItem';
import ListCarouselItems from './ListCarouselItems';
import { ProjectName } from '../../../Variables.jsx'


const Carousel = ({ newChatrooms, newOrders, user, setSnackbar, carouselView, setCarouselView, carouselItemInfo, setCarouselItemInfo }) => {

    const [items, setItems] = useState([]);

    const handlecarouselItemInfoChange = (prop) => (event) => {
        setCarouselItemInfo(prev => ({ ...prev, [prop]: event.target.value }));
    };

    return (
        <div>
            <Helmet defer={false}>
                <title>{newOrders + newChatrooms > 0 ? `(${newOrders + newChatrooms})` : ''} Karuselė | {ProjectName}</title> 
            </Helmet>
            {carouselView !== 1 ? 
                <ListCarouselItems 
                    setCarouselView={setCarouselView} 
                    user={user}
                    setCarouselItemInfo={setCarouselItemInfo}
                    setSnackbar={setSnackbar}
                    items={items}
                    setItems={setItems}
                />
            :
                <AddEditCarouselItem 
                    carouselItemInfo={carouselItemInfo} 
                    setCarouselItemInfo={setCarouselItemInfo}
                    setCarouselView={setCarouselView} 
                    setSnackbar={setSnackbar}
                    user={user}
                    handlecarouselItemInfoChange={handlecarouselItemInfoChange}
                    items={items}
                />  
            }
        </div>
    )
}

export default Carousel
