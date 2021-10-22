import {Helmet} from "react-helmet";
import { AnalyticsDashboard, SessionsByDateChart, SessionsGeoChart } from 'react-analytics-charts';

const StatisticsV3 = () => {
    
    return (
        <div >
            <Helmet>
                <title>Statistika | Artis spausdin</title>  
            </Helmet>
            <AnalyticsDashboard
                authOptions={{
                    clientId: "713874480579-ug40rallntu1usuj6m2fpehdf15t2c2h.apps.googleusercontent.com",
                }}
                renderCharts={(gapi, viewId) => {
                    return (
                    <div>
                        <SessionsByDateChart
                            gapi={gapi}
                            viewId={viewId}
                            showPageViews
                            showUsers
                        />
                        <SessionsGeoChart gapi={gapi} viewId={viewId} showPageViews />
                    </div>
                    );
                }}
            />
        </div>
    )
}

export default StatisticsV3
