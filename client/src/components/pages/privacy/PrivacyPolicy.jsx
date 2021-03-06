import { makeStyles } from '@material-ui/core/styles';
import { Box, Breadcrumbs } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import { Link } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.myTheme.trecia,
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000'
    },
    body: {
        width: '94%',
        textAlign: 'left',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        paddingBottom: '2rem',
        overflowWrap: 'break-word',
        "& p": {
            margin: '0 0 .5rem 0',
            padding: 0,
            fontSize: '1rem',
        },
        "& h1": {
            margin: '1rem 0 1rem 0',
            padding: 0,
            fontSize: '1.7rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '60%',
        },
        [theme.breakpoints.up('xxl')]: {
            "& p": {
                margin: '0 0 .7rem 0',
                padding: 0,
                fontSize: '1.5rem',
            },
            "& h1": {
                margin: '1.5rem 0 1.5rem 0',
                padding: 0,
                fontSize: '2.55rem',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            "& p": {
                margin: '0 0 1rem 0',
                padding: 0,
                fontSize: '2rem',
            },
            "& h1": {
                margin: '2rem 0 2rem 0',
                padding: 0,
                fontSize: '3.4rem',
            },
        },
    },
    breadcrumbLink: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        '&:hover': {
            color: '#2d5286',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    breadcrumbLinkDisabled: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        pointerEvents: 'none',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    breakcrumbs: {
        margin: '.5rem 0 0 0',
        [theme.breakpoints.up('md')]: {
            margin: '1rem 0 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem 0 0 0',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 0 0 0',
            fontSize: '1.8rem',
        },
    },
}));


const PrivacyPolicy = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Privatumo politika | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/privatumopolitika' className={classes.breadcrumbLinkDisabled}>Privatumo politika</Link>
                </Breadcrumbs>
                <h1>Privatumo politika</h1>
                <p><b>1. BENDROSIOS NUOSTATOS</b></p>
                <p>1.1.??UAB ???Tauro paslaugos??? (toliau - ???mes??? arba <a href='https://www.treklama.lt'>???www.treklama.lt???</a>) yra ??sipareigojusi saugoti ir gerbti J??s?? privatum??. Dedame visas pastangas, kad m??s?? atliekamas asmens duomen?? tvarkymas atitikt?? 2016 m. baland??io 27 d. Europos Parlamento ir Tarybos Reglament?? (ES) 2016/679 d??l fizini?? asmen?? apsaugos tvarkant asmens duomenis ir d??l laisvo toki?? duomen?? jud??jimo ir kuriuo panaikinama Direktyva 95/46/EB (Bendrasis duomen?? apsaugos reglamentas).</p>
                <p>1.2.??J??s?? asmens duomen?? valdytojas yra UAB ???Tauro paslaugos???, juridinio asmens kodas 305328121, adresas Daug??li?? g. 79B, Kur????nai, LT-81116 ??iauli?? r., el. pa??tas info@treklama.lt. </p>
                <p>1.3.??Pra??ome ??d??miai perskaityti ??i?? Privatumo politik??, kad suprastum??te, kokiais tikslais renkame J??s?? duomenis, taip pat, kaip juos naudosime.</p>
                <p>1.4.??Pirm?? kart?? lankantis m??s?? interneto svetain??je mes papra??ysime J??s?? patvirtinti, jog sutinkate, kad b??t?? naudojami slapukai????ioje Privatumo politikoje i??d??stytomis s??lygomis.</p>
                <p><b>2. KOKIUS J??S?? ASMENS DUOMENIS NAUDOJAME</b></p>
                <p>2.1. J??s?? vardas, pavard??, mok??tojo adresas, pristatymo adresas ir kontaktiniai duomenys??(J??s?? elektroninio pa??to adresas, telefono numeris, Facebook/Google/Linkedin paskyra). ??ie duomenys naudojami tik konkre??iai su u??sakym?? susijusiems veiksniams (Gamyba, pristatymas, s??skaitos fakt??ros i??ra??ymas).</p>
                <p>2.2.??J??s?? mok??jimo informacija. Duomenys naudojami priimant ir gra??inant Klientams pinigus.</p>
                <p>2.3. J??s?? bendravimo su mumis istorija. Duomenys naudojami teikiant paslaugas ir pagalb??, siekdami u??tikrinti vienodos ir geros kokyb??s aptarnavim?? bei apsaugoti m??s?? interesus.</p>
                <p>2.4. Pirkimo ir veiksm?? istorija. Duomenys naudojami parduodant Jums prekes.</p>
                <p>2.5. Informacija apie J??s?? ??rengin??. Duomenys naudojami rinkti informacija, kuri?? pateikiate mums nar??ydami m??s?? interneto svetain??je ??skaitant interneto protokolo (IP) adres?? ir ??renginio tip??, ekrano skiriam??j?? geb?? ir (pasirinkus informacijos bendrinim?? su mumis), taip pat informacij?? apie tai, kaip naudojat??s m??s?? interneto svetaine.</p>
                <p>2.6. Informacija, gaunama Jums jungiantis per ???Google???, ???Facebook??? ir ???Linked In???. Duomenys naudojami siekiant suteikti galimyb?? patogiau prisijungti prie m??s?? interneto svetain??s, kai jungiat??s per ???Google???, ???Facebook???  ir ???Linked In???, i?? min??t?? paslaug?? teik??j?? gausime prisijungimui reikalingus duomenis.</p>
                <p>2.7.??Mes naudojame J??s?? asmens duomenis ??ioje Privatumo politikoje nurodytais tikslais ir tais atvejais, kai b??tina vykdyti arba ginti teis??tus reikalavimus. D??l ??ios prie??asties J??s?? asmens duomenis mes tvarkome remdamiesi teis??to intereso pagrindu, siekdami apginti bei u??tikrinti savo, J??s?? ir kit?? teises.</p>
                <p>2.8.??J??s?? asmens duomenis taip pat galime tvarkyti, kai tai yra b??tina siekiant vykdyti mums privalom?? teisin?? prievol?? arba apsaugoti J??s?? arba kito fizinio asmens gyvybi??kai svarbius interesus.</p>
                <p><b>3. KOKIUS ASMENS DUOMENIS PERDUODAME TRETIESIEMS ASMENIMS</b></p>
                <p>3.1.??Mes norime ??gyti ir i??laikyti J??s?? pasitik??jim??, tod??l J??s?? asmens duomenis perduosime tik b??tinais atvejais.</p>
                <p>3.2.??J??s?? asmens duomenis galime perduoti toliau i??vardyt?? kategorij?? duomen?? gav??jams:</p>
                <p>3.2.3. Su preki?? pirkimu susijusias finansines operacijas interneto svetain??je gali tvarkyti m??s?? mok??jimo paslaug?? teik??jai.??J??s?? finansini?? operacij?? duomenis savo mok??jimo paslaug?? teik??jams atskleid??iame tik tiek, kiek b??tina mok??jimo operacijoms atlikti, pinigams gr????inti ir skundams nagrin??ti;</p>
                <p>3.2.4.??Specifin??ms paslaugoms teikti J??s?? asmens duomenis galime perduoti kitiems paslaug?? teik??jams, pavyzd??iui, interneto svetain??s paslaug?? teik??jams, kurjeri?? tarnyboms, serveri?? ir j?? technin??s prie??i??ros paslaug?? teik??jams, elektroninio pa??to paslaug?? teik??jams, naujienlai??ki?? siuntimo, apklaus?? vykdymo, socialini?? tinkl?? paskyr?? administravimo, klient?? aptarnavimo centr??, duomen?? apsaugos pareig??no paslaug?? teik??jams.</p>
                <p>3.3.??Mes pasitelkiame tik tuos paslaug?? teik??jus, kurie yra ??dieg??/??sipareigoja ??diegti atitinkamas technines ir organizacines priemones, kurios u??tikrint?? atitinkam?? duomen?? tvarkymo saugos lyg??, atitinkant?? fizini?? asmen??, kuri?? duomenys bus tvarkomi pagal duomen?? tvarkymo sutart??, teisi?? ar laisvi?? pa??eidimo rizik??, o toks duomen?? tvarkymas atitikt?? Bendrojo duomen?? apsaugos reglamento reikalavimus.</p>
                <p>3.5.????ioje dalyje nurodyti duomen?? gav??jai taip pat gali b??ti ??sisteig?? u?? Lietuvos Respublikos, Europos S??jungos ar Europos ekonomin??s erdv??s rib??. J??s?? asmens duomenis perduosime tik tokiems tretiesiems asmenims, kurie laikosi Bendrojo duomen?? apsaugos reglamento nustatyt?? reikalavim??.</p>
                <p>3.6.??Socialini?? tinkl?? valdytojai renka statistinius duomenis apie socialinio tinklo naudotoj?? veiksmus (bendras per??i??r?? skai??ius, ???patinka??? paspaudimai, reakcijos ?? ??ra??us, vaizdo ??ra???? per??i??ros, ??alis ir miestas, kalba, am??ius, interesai, elgesys, naudojami prietaisai, lytis, ir pan.) ir ??ie statistiniai duomenys gali b??ti prieinami UAB ???Tauro paslaugos???. Mes kartu su socialini?? tinkl?? ???Facebook??? ir ???Instagram??? valdytoju Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour Dublin 2 Ireland, esame bendri duomen?? valdytojai. U?? informacijos apie duomen?? tvarkym??, bendr?? duomen?? valdytoj?? susitarimo s??lyg?? teikim??, duomen?? subjekt?? teisi?? ??gyvendinim?? yra atsakinga ??mon?? Facebook Ireland Ltd. Min??t?? informacij?? galite rasti atitinkamo socialinio tinklo interneto svetain??je.</p>
                <p><b>4.??KIEK LAIKO SAUGOME J??S?? ASMENS DUOMENIS</b></p>
                <p>4.1. Visais atvejais J??s?? asmens duomenis saugome ne ilgiau, nei b??tina konkretiems tikslams pasiekti. Neaktyvi?? vartotoj?? duomenys naikinami kas 2 metus.</p>
                <p><b>5. RINKODAROS PRANE??IMAI</b></p>
                <p>5.1. Jums sutikus, elektroniniu pa??tu, SMS ??inut??mis, skambindami J??s?? nurodytu telefono ry??io numeriu Jums teiksime rinkodaros prane??imus, kad su??inotum??te m??s?? naujienas ir gal??tum??te susipa??inti su m??s?? produktais ir juos rasti.</p>
                <p>5.2.??J??s galite bet kuriuo metu atsisakyti tiesiogin??s rinkodaros prane??im??, teikiam?? i?? <a href='https://www.treklama.lt'>www.treklama.lt</a>.??Tai galite padaryti:</p>
                <p>5.3.??ra??ydami elektroniniu pa??tu info@treklama.lt??arba pasinaudodami at??aukimo nuoroda Jums elektroniniu pa??tu si??stame prane??ime arba pokalbio su m??s?? darbuotoju metu.</p>
                <p>5.4.??Jums atsisakius tiesiogin??s rinkodaros prane??im??, mes atnaujinsime J??s?? asmens duomen?? tvarkymo nustatymus, kad tiesiogin??s rinkodaros prane??imai Jums nebeb??t?? teikiami.</p>
                <p>5.5.??Atsisakius tiesiogin??s rinkodaros prane??im??, informacija apie J??s?? u??sakytas paslaugas (pavyzd??iui, naujausia informacija apie u??sakym??) bus ir toliau Jums teikiama.</p>
                <p><b>6. J??S?? TEIS??S</b></p>
                <p>6.1. ??ioje Privatumo politikos dalyje ap??velgiame duomen?? apsaugos teis??s aktuose numatytas J??s?? teises. Kai kurios teis??s apima daug aspekt??, tod??l ??ioje Privatumo politikoje pristatome tik pagrindinius. Rekomenduojame susipa??inti su atitinkamais teis??s aktais ir prie??i??ros institucij?? gair??mis, kad ??inotum??te vis?? informacij?? apie ??ias teises.</p>
                <p>6.2.??J??s turite ??ias su asmens duomen?? apsauga susijusias teises:</p>
                <p>6.2.1.??teis?? gauti informacij?? apie asmens duomen?? tvarkym??;</p>
                <p>6.2.2.??teis?? susipa??inti su savo asmens duomenimis, kuriuos mes saugome;</p>
                <p>6.2.3.??teis?? reikalauti i??taisyti J??s?? asmens duomenis, kuriuos mes saugome (daugel?? j?? galite i??taisyti??prisijung?? prie savo paskyros);</p>
                <p>6.2.4.??teis?? papra??yti, kad mes pa??alintume J??s?? asmens duomenis (???teis?? b??ti pamir??tam???);</p>
                <p>6.2.5.??teis?? apriboti J??s?? asmens duomen?? tvarkym??;</p>
                <p>6.2.6. teis?? nesutikti, kad b??t?? tvarkomi J??s?? asmens duomenys;</p>
                <p>6.2.7.??teis?? nesutikti, kad J??s?? asmens duomenys b??t?? tvarkomi tiesiogin??s rinkodaros tikslais;</p>
                <p>6.2.8.??teis?? ?? duomen?? perkeliamum??;</p>
                <p>6.2.9.??teis?? at??aukti sutikim?? tvarkyti J??s?? asmens duomenis;</p>
                <p>6.2.10.??teis?? pateikti skund?? prie??i??ros institucijai.</p>
                <p>6.3. Jei norite ??gyvendinti savo teises, arba turite klausim?? d??l J??s?? asmens duomen?? tvarkymo ar teisi?? ??gyvendinimo, ra??ykite mums elektroninio pa??tu info@treklama.lt.</p>
                <p>6.4.??Teis?? gauti informacij?? apie asmens duomen?? tvarkym??. Informacij?? apie J??s?? asmens duomen?? tvarkym?? pateikiame duomen?? rinkimo metu. J?? taip pat galite visada rasti ??ioje Privatumo politikoje arba gauti kreipdamiesi elektroniniu pa??tu info@treklama.lt.</p>
                <p>6.5.??Teis?? susipa??inti su savo asmens duomenimis, kuriuos mes tvarkome. J??s turite teis?? gauti i?? m??s?? patvirtinim?? ar tvarkome J??s?? asmens duomenis. Mums tvarkant J??s?? asmens duomenis, J??s turite teis?? susipa??inti su tvarkomais asmens duomenimis ir informacija apie j?? tvarkym??, tokia kaip asmens duomen?? tvarkymo tikslai, asmens duomen?? kategorijos, asmens duomen?? gav??jai ir kt. Mes Jums pateiksime J??s?? asmens duomen?? kopij??. J??s turite teis?? gauti savo asmens duomenis susistemintu, ??prastai naudojamu ir kompiuterio skaitomu formatu. Ta??iau ??ia teise negal??site pasinaudoti tais atvejais, kai ji gali neigiamai paveikti kit?? teises ir laisves.</p>
                <p>6.6.??Mes turime teis?? atsisakyti pateikti J??s?? tvarkomus duomenis, jei nustatomos teis??s aktuose nurodytos aplinkyb??s, kurioms esant asmens duomenys n??ra teikiami.</p>
                <p>6.7.??Teis?? reikalauti i??taisyti J??s?? asmens duomenis, kuriuos mes saugome. J??s turite teis?? patikslinti visus netikslius savo asmens duomenis ir, atsi??velgiant ?? tvarkymo tikslus, papildyti visus nei??samius savo asmens duomenis.</p>
                <p>6.8.??Teis?? i??trinti J??s?? asmens duomenis. ??ia teise galite pasinaudoti, kai: (i) asmens duomen?? nebereikia, kad b??t?? pasiekti tikslai, kuriems jie buvo renkami ar kitaip tvarkomi; (ii) at??aukiate savo sutikim?? ir n??ra kito teisinio pagrindo tvarkyti duomenis; (iii) nesutinkate, kad asmens duomenys b??t?? tvarkomi siekiant teis??to m??s?? arba tre??iosios ??alies intereso; (iv) asmens duomenys tvarkomi tiesiogin??s rinkodaros tikslais, (v) asmens duomenys buvo tvarkomi neteis??tai; (vi) asmens duomenys turi b??ti i??trinti laikantis mums taikom?? teis??s akt?? reikalavim??. Atkreipiame J??s?? d??mes??, kad tam tikrais atvejais ??ia teise pasinaudoti negal??site d??l taikom?? i??im??i??. ??ios i??imtys apima atvejus, kai tvarkyti asmens duomenis yra b??tina siekiant: (i) pasinaudoti savirai??kos ir informacijos laisve; (ii) ??gyvendinti m??s?? teisinius ??sipareigojimus; arba (iii) pareik??ti, vykdyti arba ginti teisinius reikalavimus.</p>
                <p>6.9.??Teis?? apriboti J??s?? duomen?? tvarkym??. ??ia teise galima pasinaudoti tokiais atvejais: (i) Jums gin??ijant asmens duomen?? tikslum??; (ii) kai asmens duomenys tvarkomi neteis??tai, ta??iau J??s nenorite, kad jie b??t?? i??trinti; (iii) kai asmens duomen?? nebereikia m??s?? duomen?? tvarkymo tikslais, ta??iau J??s j?? pra??ote d??l teisini?? reikalavim?? parei??kimo, vykdymo ar gynimo, arba (iv) Jums nesutikus, kad jie b??t?? tvarkomi remiantis teis??tu m??s?? arba tre??iosios ??alies interesu, kol bus patikrintas J??s?? nesutikimo pagrindas. Apribojus asmens duomen?? tvarkym??, mes galime toliau saugoti J??s?? asmens duomenis, ta??iau toliau j?? netvarkysime, i??skyrus: (i) tur??dami J??s?? sutikim??; (ii) d??l teisini?? reikalavim?? parei??kimo, vykdymo ir gynimo; (iii) siekdami apsaugoti kit?? fizini?? ar juridini?? asmen?? teises arba (iv) d??l svarbaus vie??ojo intereso.</p>
                <p>6.10. Teis?? nesutikti, kad b??t?? tvarkomi J??s?? asmens duomenys.????ia teise galite pasinaudoti bet kokiu tikslu d??l prie??as??i??, susijusi?? su J??s?? konkre??ia situacija, ta??iau tik tokiu mastu, kiek duomenis naudojame d??l m??s?? ar tre??iosios ??alies teis??t?? interes??. Jums parei??kus nesutikim??, mes nebetvarkysime asmens duomen??, i??skyrus atvejus, kai galime ??rodyti, kad duomenys tvarkomi d??l ??tikinam?? teis??t?? prie??as??i??, kurios yra vir??esn??s u?? J??s?? interesus, teises ir laisves, arba siekdami pareik??ti, vykdyti ar apginti teisinius reikalavimus ir (ar) teis??tus m??s?? reikalavimus.</p>
                <p>6.11.??Teis?? nesutikti, kad J??s?? asmens duomenys b??t?? tvarkomi tiesiogin??s rinkodaros tikslais??(??skaitant profiliavim?? tiesiogin??s rinkodaros tikslais). Jums su tuo nesutikus, mes nebetvarkysime J??s?? asmens duomen?? ??iuo tikslu.</p>
                <p>6.12.??Teis?? ?? duomen?? perkeliamum??.????i?? teis?? gal??site ??gyvendinti tais atvejais, kai J??s?? asmens duomenis tvarkome automatizuotomis priemon??mis (kompiuteriais ir pan.) ir asmens duomen?? tvarkymo teisinis pagrindas yra:</p>
                <p>6.12.1.??J??s?? sutikimas, arba</p>
                <p>6.12.2.??sutarties vykdymas ar veiksmai, atlikti J??s?? pra??ymu prie?? sudarant sutart??.</p>
                <p>6.13.??Teis?? at??aukti sutikim?? tvarkyti J??s?? asmens duomenis. Tais atvejais, kai J??s?? asmens duomen?? tvarkymo teisinis pagrindas yra sutikimas, J??s turite teis?? bet kuriuo metu at??aukti sutikim??. Sutikimo at??aukimas netur??s ??takos duomen?? tvarkymo teis??tumui iki at??aukimo.</p>
                <p>6.14.??Teis?? pateikti skund?? prie??i??ros institucijai. Jei manote, kad tvarkydami J??s?? asmens duomenis pa??eid??iame asmens duomen?? apsaug?? reglamentuojan??ius teis??s aktus, J??s turite teis?? pateikti skund?? Valstybinei duomen?? apsaugos inspekcijai, kurios buvein??s adresas L. Sapiegos g. 17, LT-10312 Vilnius,??<a href='http://www.vdai.lrv.lt' target='_blank' rel="noreferrer">www.vdai.lrv.lt.</a> Visais atvejais, prie?? teikdami skund??, susisiekite su mumis, kad kartu gal??tume rasti tinkam?? sprendim??.</p>
                <p><b>8.??VAIK?? ASMENS DUOMEN?? TVARKYMAS</b></p>
                <p>8.1 Tvarkant nepilname??io asmens duomenis sutikimo pagrindu informacin??s visuomen??s paslaug?? si??lymui, toks duomen?? tvarkymas yra teis??tas, jei nepilnametis yra sulauk??s bent 16 met??. Jeigu tokiam nepilname??iui n??ra 16 met??, toks tvarkymas yra teis??tas tik tokiu atveju, jei sutikim?? dav?? arba tvarkyti duomenis leido nepilname??io t??vai arba glob??jai, tod??l:</p>
                <p>8.2 Jeigu J??s esate jaunesnis nei 18 met??, bet jau sulauk??s 16 met??, naudodamiesi m??s?? Elektronin??s parduotuv??s paslaugomis, J??s patvirtinate, jog turite savo t??v??, glob??j?? pritarim?? d??l J??s?? asmenin??s informacijos atskleidimo Bendrovei; jeigu J??s esate jaunesnis nei 16 met??, naudotis m??s?? Elektronin??s parduotuv??s paslaugomis ir turiniu galite tik J??s?? t??vams, glob??jams d??l to davus sutikim?? Bendrovei.??</p>
                <p><b>9. PRIVATUMO POLITIKOS PAKEITIMAI</b></p>
                <p>9.1. Mes periodi??kai galime keisti ??i?? Privatumo politik??, kad ji tinkamai atspind??t?? kaip tvarkome J??s?? asmens duomenis.</p>
                <p>9.2.??Atlik?? reik??ming?? pakeitim??, apie tai prane??ime interneto svetain??je arba kitomis atitinkamomis susisiekimo priemon??mis, pavyzd??iui, elektroniniu pa??tu, kad J??s gal??tum??te per??i??r??ti ??iuos pakeitimus prie?? toliau naudodamiesi m??s?? interneto svetaine.</p>
            </Box>
        </Box>
    )
}

export default PrivacyPolicy
