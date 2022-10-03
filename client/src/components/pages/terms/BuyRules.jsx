import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import Breadcurmbs from '../utils/Breadcurmbs.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    body: {
        width: '94%',
        textAlign: 'left',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        overflowWrap: 'break-word',
        "& p": {
            margin: '0 0 .5em 0',
            padding: 0,
            fontSize: theme.myTheme.sizeM,
        },
        "& h1": {
            margin: '1em 0 1em 0',
            padding: 0,
            fontSize: theme.myTheme.sizeXL,
        },
        [theme.breakpoints.up('lg')]: {
            width: '100%',
        },
    },
}));

const BuyRules = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Pirkimo taisyklės | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcurmbs routes={[{path: 'pirkimotaisykles', name: 'Pirkimo taisyklės'}]}/>
                <h1>Pirkimo taisyklės</h1>
                <p>1. Bendrosios nuostatos</p>
                <p>1.1. Šios pirkimo taisyklės, kartu su dokumentais, nurodytais šiose taisyklėse, yra skirtos suteikti informaciją apie UAB „Tauro paslaugos“ („Pardavėjas“) bei išdėstyti asmenims, įsigyjantiems prekes („Prekės“) internetinėje parduotuvėje („Pirkėjas“), Prekių, parduodamų šioje internetinėje parduotuvėje, pardavimo sąlygas („Taisyklės“).</p>
                <p>1.2. Šios Taisyklės yra taikomos sudarant bet kokias sutartis tarp Pardavėjo ir Pirkėjo dėl Prekių pardavimo („Sutartis“). Prieš vykdant bet kokių Prekių užsakymą internetinėje parduotuvėje, prašome atidžiai perskaityti šias Taisykles ir įsitikinti, kad jas tinkamai supratote. Prašome atkreipti dėmesį, kad prieš užbaigdamas užsakymą Pirkėjas privalo sutikti su šiomis Taisyklėmis bei Privatumo politika, o atsisakius tai padaryti, užsakymo užbaigimas ir Prekės užsakymas yra negalimas.</p>
                <p>1.3. Pirkėjas yra skatinamas atsispausdinti šias Taisykles ateities reikmėms.</p>
                <p>1.4. Taip pat informuojame, kad šios Taisyklės gali būti keičiamos 6 dalyje nustatyta tvarka. Kiekvieną kartą užsakant Prekes, rekomenduojame peržiūrėti Taisykles tam, kad Pirkėjas būtų įsitikinęs, jog pilnai supranta kokiomis sąlygomis, konkrečiu atveju, bus daromas užsakymas.</p>
                <p>1.5. Šios Taisyklės ir bet kokios Sutartys tarp Pardavėjo ir Pirkėjo yra sudaromos tik nacionaline kalba.</p>
                <p>2. Informacija apie Pardavėją</p>
                <p>2.1. Šios Taisyklės yra taikomos įsigyjant Prekes adresu https://www.treklama.lt. Pardavėjas yra UAB „Tauro paslaugos“, Lietuvos bendrovė, tinkamai įregistruota ir veikianti Lietuvos Respublikoje, juridinio asmens kodas 305328121, buveinės adresas Daugėlių g. 79B, Kuršėnai, LT-81116 Šiaulių r. Duomenys apie Pardavėją kaupiami ir saugomi – Juridinių asmenų registre, registro tvarkytojas Valstybės įmonė Registrų centras. Pardavėjo PVM mokėtojo kodas LT100012761116.</p>
                <p>2.2. Daugiau informacijos apie Pardavėją pateikiama skiltyje „Apie mus“.</p>
                <p>2.3. Pardavėjo kontaktinė informacija pateikiama skiltyje „Kontaktai“.</p>
                <p>3. Prekės</p>
                <p>3.1. Internetinėje parduotuvėje pateikiami Prekių atvaizdai yra iliustracinio pobūdžio. </p>
                <p>3.2. Didžioji dalis prekių parduotuvėje yra unikalios ir gaminamos konkrečiai Pirkėjui pagal jo pateiktus failus, nuotraukas ar maketus. Pardavėjas negali garantuoti, kad Pirkėjo įrenginio ekranas tiksliai atspindės Prekių spalvas. Pirkėjas supranta, kad Prekės gali nežymiai skirtis nuo jų atvaizdų Jūsų kompiuteryje/plančetėje/ telefone ar kituose ekranuose.</p>
                <p>3.3. Pirkėjui reikėtų nepamiršti, kad skaitmeninėje erdvėje matomas maketas gali neatitikti mastelio, todėl vaizdas gautas spaudos gaminyje gali šiek tiek skirtis, taip pat maketas atspausdintas ant vieno arba kito popieriaus gali turėti įtakos spalvų skirtumui. Popierius taip pat turi įtakos gaminio spaudai.</p>
                <p>3.4. Prekės, pateikiamos internetinėje parduotuvėje, yra prieinamos. Tuo atveju, jeigu užsakytos Prekės nebelieka, Pirkėjas yra nedelsiant apie tai informuojamas elektroniniu paštu ar kitomis priemonėmis (skambučiu ir/arba SMS žinute) ir tokios Prekės užsakymo vykdymas yra nutraukiamas arba sutariamas kitas prekių pristatymo terminas.</p>
                <p>4. Asmens duomenų tvarkymas</p>
                <p>4.1. Pardavėjas Pirkėjo asmens duomenis tvarko vadovaudamasis Privatumo politika. Atsižvelgiant į tai, kad Privatumo politikoje nurodomos svarbios Taisyklių nuostatos, rekomenduojama, kad Pirkėjas atidžiai jas perskaitytų ir būtų įsitikinęs, kad visos Privatumo politikos nuostatos jam yra suprantamos ir priimtinos.</p>
                <p>5. Pirkimo pardavimo sutarties sudarymas</p>
                <p>5.1. Šioje internetinėje parduotuvėje Prekes įsigyti gali Pirkėjai:</p>
                <p>a) fiziniai asmenys;</p>
                <p>b) juridiniai asmenys.</p>
                <p>5.2. Pardavėjo nustatyta Prekių užsakymo tvarka suteikia Pirkėjui galimybę patikrinti ir ištaisyti klaidas, prieš teikiant galutinį užsakymą. Rekomenduojama, kad Pirkėjas atidžiai perskaitytų ir patikrintų teikiamą užsakymą, kiekviename užsakymo teikimo etape.</p>
                <p>5.3. Sutartis tarp Pirkėjo ir Pardavėjo laikoma sudaryta nuo tada, kai Pirkėjas, internetinėje parduotuvėje suformavęs Prekių krepšelį, nurodęs Pirkėjo vardą, pavardę (lotyniškomis raidėmis) ir pristatymo adresą, tikslų pašto kodą, kontaktinio telefono numerį, pasirinkęs mokėjimo būdą ir susipažinęs su šiomis Taisyklėmis, paspaudžia mygtuką „Užsakyti“ ir apmoka užsakymą arba pasirenka apmokėjimo būdą, nurodytą 10.1 punkto b dalyje. Užsakymo neapmokėjus sutartis laikoma nesudaryta. Pardavėjas turi teisę susisiekti su Pirkėju užsakyme nurodytu telefono numeriu arba elektroniniu paštu sudarytos sutarties pagrindu arba sprendžiant iškilusius neaiškumus dėl sutarties vykdymo.</p>
                <p>5.4. Pirkėjui pateikus ir apmokėjus užsakymą arba pasirinkus 10.1 punkto b dalyje nurodytą mokėjimo būdą - jam išsiunčiamas elektroninis laiškas, patvirtinantis užsakymo gavimą.</p>
                <p>5.5. Paruošus užsakymą, Pardavėjas išsiunčia Pirkėjui elektroninį laišką ir/ar trumpąją SMS žinutę, informuojančią, kad Prekės išsiųstos Pirkėjui arba parengtos atsiėmimui atsiėmimo punkte.</p>
                <p>5.6. Kiekviena tarp Pirkėjo ir Pardavėjo sudaryta Sutartis (užsakymas) yra registruojama ir saugoma internetinės parduotuvės duomenų bazėje.</p>
                <p>5.7. Sudarydamas Sutartį Pirkėjas sutinka, kad pirkimo metu nurodytu elektroninio pašto adresu bus siunčiama užsakymo elektroninė PVM sąskaita faktūra su pirkimo duomenimis. Sąskaita faktūra siunčiama el. paštu ne vėliau kaip per 6 (šešias) darbo dienas nuo momento, kai Pirkėjas atsiima Prekes  ar Pardavėjas perduoda Prekes kurjeriui (jei Prekės Pirkėjui pristatomos naudojantis kurjerio paslaugomis). </p>
                <p>5.8. Tuo atveju, jeigu Pardavėjas neturi galimybės parduoti Prekę, pavyzdžiui, dėl to, kad prekė nebėra parduodama arba dėl klaidos, susijusios su internetinėje parduotuvėje pateikiama kaina, kaip tai nurodyta šių Taisyklių 9.5 punkte, Pardavėjas informuos Pirkėją elektroniniu paštu ar kitomis priemonėmis (skambučiu ir/arba SMS žinute) ir užsakymas nebus vykdomas. Tuo atveju, jeigu Pirkėjas jau bus sumokėjęs už Prekę, Pardavėjas grąžins sumokėtas sumas per 5 (penkias) kalendorines dienas.</p>
                <p>6. Teisė keisti taisykles</p>
                <p>6.1. Pardavėjas pasilieka teisę keisti šias Taisykles, įskaitant, bet neapsiribojant, dėl:</p>
                <p>a) apmokėjimo sąlygų keitimo;</p>
                <p>b) taikytinų teisės aktų pakeitimų.</p>
                <p>6.2. Kiekvieną kartą užsisakant Prekes, Sutarties tarp Pardavėjo ir Pirkėjo sudarymo tikslais, galios tuo metu galiojanti Taisyklių redakcija.</p>
                <p>6.3. Kiekvieną kartą pasikeitus Taisyklėms, remiantis šiuo Taisyklių 6 punktu, Pardavėjas informuos Pirkėją ir praneš apie tai, nurodydamas, kad Taisyklės buvo pakeistos ir jų pakeitimo data bus pateikiama šių Taisyklių 1.4 punkte.</p>
                <p>7. Prekių grąžinimas, Sutarties atsisakymas</p>
                <p>Atsižvelgiant į produktus parduodamus internetinėje parduotuvėje, grąžinimo negalima atlikti, kai užsakymas jau yra vykdomas ir/ ar išsiųstas.</p>
                <p>7.1 Kokybiškos prekės  yra nekeičiamos, negrąžinamos.</p>
                <p>7.2 Prekių trūkumai šalinami ar keičiami, jei dėl darbu ar produkto trūkumų yra atsakingas Pardavėjas.</p>
                <p>7.3 Jei dėl prekių trūkumų yra atsakingas Pardavėjas ir neįmanoma produkcijos trūkumų ištaisyti/pašalinti/pakeisti, Pirkėjo sumokėti pinigai už šią produkciją yra grąžinami į mokėtojo banko sąskaitą per 5 (penkias) darbo dienas.</p>
                <p>7.4 Pageidaujant grąžinti/pakeisti nekokybišką prekę būtina laikytis papildomų sąlygų:</p>
                <p>a) Produkcija turi būti Pirkėjo nesugadinta;</p>
                <p>b) Grąžinama prekė turi būti Pardavėjo pakuotėje arba kitoje, užtikinčioje saugų transportavimą pakuotėje;</p>
                <p>c) Produkcija turi būti grąžinama Pardavėjo buveinės adresu: Daugėlių g. 79B, Kuršėnai, LT-81116 Šiaulių r.</p>
                <p>7.5 Pardavėjas turi teisę atsisakyti priimti Pirkėjo grąžinamą prekę, jei buvo nesilaikoma produkcijos grąžinimo sąlygų.</p>
                <p>8. Pristatymas</p>
                <p>Pristatymas į namus</p>
                <p>8.1. Pirkėjo pasirinkimu, Prekes Pirkėjo sąskaita pristato transporto įmonė. Atskirais Pardavėjo nurodytais atvejais Prekės pristatomos Pardavėjo sąskaita.</p>
                <p>8.2. Pirkėjas užsakymo metu pasirinkdamas Prekių pristatymo paslaugą, įsipareigoja nurodyti tikslią Prekių pristatymo vietą. Tiksli pristatymo kaina priklauso nuo užsakomų Prekių svorio ir kainos.</p>
                <p>8.3. Pirkėjo užsakymas įvykdomas iki planuojamos pristatymo dienos, nurodytos 5.6 punkte nurodytame pranešime apie išsiuntimą, išskyrus atvejus, kai įvyksta Pardavėjo nekontroliuojami įvykiai (kaip jie yra apibrėžti šių Taisyklių 15 dalyje).</p>
                <p>8.4. Pirkėjas visada yra informuojamas apie numatomą Prekės pristatymo terminą elektroniniu paštu.</p>
                <p>8.5. Nuosavybės teisė į Prekę pereina Pirkėjui nuo momento, kai kurjeris perduoda Prekes Pirkėjui arba atsiima atsiėmimo punktuose. Prekių atsitiktinio žuvimo ar sugedimo rizika pereina Pirkėjui, kai jis ar jo nurodytas asmuo, išskyrus kurjerį, priima prekes.</p>
                <p>8.6. Siuntos pristatymo metu Pirkėjas ar, atsižvelgiant į atvejį, Pirkėjo atstovas privalo kartu su transporto įmonės atstovu patikrinti siuntos pakuotės būklę, vadovaujantis kurjerių paslaugas teikiančios (-ių) organizacijos (-ų) taisyklėmis.</p>
                <p>8.7. Nustačius siuntos pakuotės pažeidimą, Pirkėjas ar, atsižvelgiant į atvejį, Pirkėjo atstovas turi teisę siuntos nepriimti. Tokiu atveju kurjerių paslaugas teikiančios organizacijos atstovas kartu su Pirkėju ar, atsižvelgiant į atvejį, Pirkėjo atstovu užpildo specialų siuntų patikrinimo aktą, pateikiamą kurjerių paslaugas teikiančios organizacijos atstovo, kuriame nurodo rastus pažeidimus.</p>
                <p>8.8. Pirkėjui ar, atsižvelgiant į atvejį, Pirkėjo atstovui priėmus siuntą ir pasirašius kurjerių paslaugas teikiančios organizacijos atstovo pateiktame duomenų kaupiklyje arba popieriniame pristatymo patvirtinime be pastabų, laikoma, kad Prekės pristatytos nepažeistoje siuntos pakuotėje, papildomos paslaugos, nurodytos duomenų kaupiklyje arba popieriniame pristatymo patvirtinime, tinkamai atliktos, jei neįrodoma priešingai.</p>
                <p>8.9. Pristačius ir perdavus Prekes Pirkėjo nurodytu adresu, laikoma, kad Prekės Pirkėjui yra perduotos, neatsižvelgiant į tai, ar Prekes faktiškai priima Pirkėjas, ar bet kuris kitas asmuo, priėmęs Prekes nurodytu adresu. Jei planuojamą Prekių pristatymo dieną Prekės nepristatomos, Pirkėjas nedelsdamas, bet ne vėliau kaip kitą dieną po planuotos Prekių pristatymo dienos, apie tai informuoja Pardavėją.</p>
                <p>8.10. Jei Prekes priims ne Pirkėjas, Pirkėjas privalo nurodyti Prekes priimsiančio asmens duomenis, pildydamas užsakymo pristatymo informaciją.</p>
                <p>8.11. Priimant Prekes būtina pateikti galiojantį asmens tapatybę patvirtinantį dokumentą, tam, kad būtų tinkamai identifikuotas Pirkėjas. Jei Pirkėjas Prekių pats priimti negali, o Prekės pristatytos Pirkėjo nurodytu adresu, Pirkėjas neturi teisės reikšti Pardavėjui pretenzijų dėl Prekių pristatymo netinkamam asmeniui.</p>
                <p>8.12. Pirkėjas privalo per 14 (keturiolika) dienų nuo Prekių pristatymo momento patikrinti Prekių pakuotes, kiekį, kokybę, asortimentą, komplektiškumą ir komplektaciją. Pirkėjui per nurodytą terminą neįvykdžius šios pareigos ir nepareiškus Pardavėjui pretenzijų, laikoma, kad Prekių pakuotės yra tinkamos, o kiekis, kokybė, asortimentas, komplektiškumas ir komplektacija atitinka Sutarties sąlygas.</p>
                <p>9. Prekių kaina ir pristatymo išlaidos </p>
                <p>9.1. Prekių kainos bus tokios, kokios yra nurodytos internetinėje parduotuvėje. Pardavėjas deda visas protingas pastangas tam, kad užtikrintų, kad Prekių kainos, tuo metu, kai Pirkėjas pateikinėja užsakymą, būtų teisingos. Jeigu, Pardavėjas pastebi, kad Prekių kainose yra netikslumų, taikomas šių Taisyklių 9.5 punktas.</p>
                <p>9.2. Prekių kainos gali keistis, tačiau tokie pasikeitimai neturės įtakos jau sudarytoms Sutartims.</p>
                <p>9.3. Prekių kainos pateikiamos įskaitant PVM (ten, kur jis taikomas) tokio dydžio, kuris taikomas konkrečiu metu Lietuvos Respublikoje. Tuo atveju, jeigu PVM dydis keistųsi laikotarpiu nuo užsakymo dienos iki pristatymo dienos, kaina gali keistis, atsižvelgiant į PVM dydžio pasikeitimą, išskyrus tuos atvejus, kai Pirkėjas už Prekes visiškai atsiskaitė prieš įsigaliojant PVM dydžio pakeitimui. Pardavėjas apie tokį kainos pasikeitimą raštu informuoja Pirkėją ir suteikia galimybę Pirkėjui įsigyti Prekę už kainą, pakoreguotą, atsižvelgiant į pasikeitusį PVM dydį arba atšaukti užsakymą. Užsakymas nėra vykdomas tol, kol negaunamas Pirkėjo atsakymas. Tuo atveju, jeigu su Pirkėju nepavyksta susisiekti jo nurodytais kontaktais, laikoma, kad užsakymas yra atšauktas ir Pirkėjas apie tai informuojamas raštu.</p>
                <p>9.4. Prekių kainos neapima užsakymo paruošimo, pristatymo išlaidų. Pristatymo išlaidų dydis nurodomos internetinėje parduotuvėje gali keistis.</p>
                <p>9.5. Atsižvelgiant į tai, kad Pardavėjo internetinėje parduotuvėje pateikiamas itin platus Prekių asortimentas, nepaisant visų protingų Pardavėjo pastangų, lieka galimybė, kad dalis Prekių gali būti pateikiamos klaidingomis kainomis. Tuo atveju, jeigu Pardavėjas nustato, kad pateikta Prekių kaina yra klaidinga, Pardavėjas apie tai elektroniniu paštu ar kitomis priemonėmis (skambučiu ir/arba SMS žinute) informuoja Pirkėją ir atšaukia užsakymą. Pirkėjas, norėdamas įsigyti tą pačią Prekę už teisingą kainą, ją turi užsakyti iš naujo. Pažymėtina, kad jeigu kainos klaidingumas yra akivaizdus ir Pirkėjas pagrįstai galėjo atpažinti tokį klaidingą įkainojimą, Pardavėjui nekyla pareigos parduoti Pirkėjui Prekes neteisinga kaina.</p>
                <p>10. Apmokėjimas</p>
                <p>10.1. Už Prekes Pirkėjas gali atsiskaityti:</p>
                <p>a) naudodamasis elektronine bankininkyste;</p>
                <p>b) grynaisiais pinigais arba banko kortele;</p>
                <p>d) mokėjimo (kredito arba debetine) kortele.</p>
                <p>10.2. Juridiniams asmenims taip pat suteikiama galimybė atsiskaityti bankiniu pavedimu į Pardavėjo sąskaitą, nurodomą Pirkėjui siunčiamoje išankstinėje PVM sąskaitoje faktūroje, mokėjimo paskirtyje nurodant Pirkėjui suteiktą užsakymo numerį.</p>
                <p>10.2.1.  Juridiniams asmenims, atsiskaitantiems pavedimu ar elektronine bankininkyste, rekomenduojama pavedimo informacijoje perduoti įmonės kodą greitesniam mokėtojo identifikavimui. Tokiu būdu užsakymas sistemoje bus greičiau patvirtinamas ir pradedamas vykdyti.</p>
                <p>10.3. Pirkėjui pasirinkus 10.1(a, b ir d) punktuose nurodytą atsiskaitymo būdą, Pirkėjas privalo patvirtinti mokėjimo pavedimą Pirkėjo banke ne vėliau kaip per 24 (dvidešimt keturias) valandas nuo mygtuko „Užsakyti“ paspaudimo. Per šį terminą nepatvirtinus mokėjimo pavedimo, Pardavėjas turi teisę laikyti, kad Pirkėjas atsisakė sudaryti Sutartį, ir anuliuoti užsakymą.</p>
                <p>11. Pirkėjo pareigos</p>
                <p>11.1. Pirkėjas įsipareigoja pirkimo formoje pateikti tik teisingus ir išsamius duomenis. Pasikeitus pirkimo formoje nurodytiems duomenims Pirkėjas privalo nedelsdamas juos atnaujinti.</p>
                <p>11.2. Pirkėjas įsipareigoja sąžiningai ir teisingai naudotis internetine parduotuve, nekenkti jos darbui ar stabiliam veikimui. Pirkėjui nesilaikant šios pareigos, Pardavėjas turi teisę be išankstinio perspėjimo apriboti, sustabdyti (nutraukti) Pirkėjo galimybę naudotis internetine parduotuve ir neatsako už jokius su tuo susijusius Pirkėjo nuostolius.</p>
                <p>11.3. Pirkėjas privalo sumokėti už užsisakytas Prekes ir priimti jas šių Taisyklių nustatyta tvarka.</p>
                <p>11.4. Nepaisant pareigų, numatytų kituose Taisyklių punktuose, Pirkėjas įsipareigoja, prieš pradėdamas naudoti Prekę apžiūrėti ją ir įsitikinti, kad gauta Prekė yra ta, kurią Pirkėjas užsakė.</p>
                <p>11.5. Pirkėjas privalo laikytis kitų šiose Taisyklėse ir Lietuvos Respublikos teisės aktuose nustatytų reikalavimų.</p>
                <p>12. Pardavėjo pareigos</p>
                <p>12.1. Pardavėjas įsipareigoja:</p>
                <p>a) dėti pastangas sudarant sąlygas Pirkėjui tinkamai naudotis internetinės parduotuvės teikiamomis paslaugomis;</p>
                <p>b) gerbti Pirkėjo privatumą, Pirkėjo asmens duomenis tvarkyti tik šių Taisyklių, Privatumo politikos ir Lietuvos Respublikos teisės aktų nustatyta tvarka.</p>
                <p>12.2. Pardavėjas įsipareigoja laikytis visų šiose Taisyklėse prisiimtų reikalavimų.</p>
                <p>13. Prekės kokybė</p>
                <p>13.1. Pardavėjas garantuoja Prekių kokybę (įstatyminė kokybės garantija). Pardavėjas skirtingoms Prekių rūšims suteikia tam tikrą laiką galiojančią kokybės garantiją, kurios konkretus terminas ir kitos sąlygos nurodomos dokumentuose pateikiamuose kartu su Preke. Prekės gamintojo garantiniai įsipareigojimai galioja tik tuo atveju, jei nepažeistos prekės eksploatavimo sąlygos. Prieš naudodamasis Preke Pirkėjas turi atidžiai perskaitykite prekės eksploatavimo instrukciją, jei tokia yra.</p>
                <p>13.2. Prekių trūkumai šalinami, nekokybiškos Prekės keičiamos, grąžinamos vadovaujantis šiose Taisyklėse įtvirtinta tvarka ir atsižvelgiant į taikytinų Lietuvos Respublikos teisės aktų reikalavimus.</p>
                <p>13.3. Teikdamas skundą Pirkėjas turi pridėti Prekės įsigijimo PVM sąskaitą faktūrą (jos numerį) bei nurodyti tokią informaciją:</p>
                <p>a) Prekės užsakymo numerį;</p>
                <p>b) įvardyti Prekės defekto požymius ar trūkumus;</p>
                <p>c) pateikti kitus įrodymus, pavyzdžiui, Prekės nuotrauką, nekokybiškos vietos nuotrauką (jei tai mechaninis pažeidimas ir įmanoma nufotografuoti), Prekės pakuotės nuotrauką, kita.</p>
                <p>13.4. Teikdamas skundą Pirkėjas turi nurodyti, kaip pageidauja, kad būtų išspręsta pretenzija:</p>
                <p>a) Pardavėjui neatlygintinai per protingą terminą pašalinant Prekės trūkumus, jei trūkumus įmanoma pašalinti;</p>
                <p>b) atitinkamai sumažinant pirkimo kainą;</p>
                <p>c) pakeičiant Prekę analogiška tinkamos kokybės preke, išskyrus atvejus, kai trūkumai yra nedideli arba jie atsirado dėl Pirkėjo kaltės;</p>
                <p>d) grąžinant sumokėtą Prekės kainą ir atsisakant Sutarties, kai netinkamos kokybės Prekės yra esminis užsakymo pažeidimas.</p>
                <p>13.5. Išnagrinėjus pretenziją, atsakymas pateikiamas per 5 (penkias) dienas.</p>
                <p>14. Atsakomybė</p>
                <p>14.1. Pirkėjas atsako už veiksmus, atliktus naudojantis internetine parduotuve, įskaitant, bet neapsiribojant, už pirkimo formoje pateiktų duomenų teisingumą. Pirkėjas prisiima atsakomybę už padarinius, kilusius dėl pirkimo formoje pateiktų duomenų klaidingumo ar netikslumo.</p>
                <p>14.2. Internetinės parduotuvės Pirkėjas atsako už savo prisijungimo duomenų saugojimą ir (arba) perdavimą tretiesiems asmenims. Jeigu internetinės parduotuvės teikiamomis paslaugomis naudojasi tretieji asmenys, prisijungę prie internetinės parduotuvės per Pirkėjo prisijungimo duomenis, Pardavėjas tokį asmenį laiko Pirkėju ir Pirkėjas atsako už visus tokio trečiojo asmens veiksmus, atliktus internetinėje parduotuvėje.</p>
                <p>14.3. Pardavėjas, tiek kiek tai neprieštarauja taikytiniems teisės aktams, yra atleidžiamas nuo bet kokios atsakomybės tais atvejais, kai nuostoliai kyla dėl to, jog Pirkėjas, neatsižvelgdamas į Pardavėjo rekomendacijas ir savo įsipareigojimus, nesusipažino su šiomis Taisyklėmis, Privatumo politika ir kitais šiose Taisyklėse nurodomais dokumentais, nors tokia galimybė jam buvo suteikta.</p>
                <p>14.4. Atsižvelgdami į Lietuvos Respublikos elektroninio parašo įstatymo 8 straipsnio 3 dalies nuostatas, Pirkėjas ir Pardavėjas susitaria, kad Pirkėjo veiksmų internetinėje parduotuvėje patvirtinimas prisijungimo prie internetinės parduotuvės duomenimis (atpažinimo kodu) turi Lietuvos Respublikos elektroninio parašo įstatymo 8 straipsnio 1 dalyje įtvirtintą elektroninio parašo teisinę galią (t. y. turi tokią pačią teisinę galią, kaip ir parašas rašytiniuose dokumentuose ir yra leistinas kaip įrodymo priemonė teisme). Pirkėjas privalo saugoti savo prisijungimo prie internetinės parduotuvės duomenis ir jų neatskleisti, užtikrinti, kad duomenys būtų žinomi tik jam pačiam ir duomenimis naudotųsi tik jis pats, neperduoti ir kitais būdais nesudaryti galimybės kitiems asmenims su tais duomenimis susipažinti ar jais pasinaudoti. Kilus įtarimui, kad prisijungimo duomenys galėjo būti sužinoti kito asmens, nedelsiant apie tai pranešti Pardavėjui, taip pat nedelsiant informuoti Pardavėją apie prisijungimo prie internetinės parduotuvės duomenų pažeidimą ar paviešinimą. Visi veiksmai, atlikti naudojantis Pirkėjo atpažinimo kodu, laikomi atliktais Pirkėjo, ir Pirkėjas prisiima visą atsakomybę už tokių veiksmų pasekmes.</p>
                <p>14.5. Už Sutarties, sudarytos naudojantis internetine parduotuve, pažeidimą šalys atsako Lietuvos Respublikos teisės aktų nustatyta tvarka.</p>
                <p>14.6. Tuo atveju, jeigu Pardavėjas pažeidžia šių Taisyklių nuostatas, jis yra atsakingas už Pirkėjo patirtą žalą ar nuostolius, kurie kyla kaip numatytina šių Taisyklių pažeidimo pasekmė. Žala arba nuostoliai laikomi numatytinais, jeigu jie yra akivaizdi Pardavėjo pažeidimo pasekmė arba, jeigu tokią žalą ar nuostolius Pardavėjas ir Pirkėjas suvokė, sudarydami Sutartį.</p>
                <p>15. Pardavėjo nekontroliuojami įvykiai</p>
                <p>15.1. Pardavėjas nebus atsakingas už Sutarties ar bet kokių įsipareigojimų pagal Sutartį neįvykdymo arba pavėluoto įvykdymo, jeigu toks neįvykdymas ar vėlavimas atsirado dėl Pardavėjo nekontroliuojamų įvykių, kaip jie yra apibrėžti šių Taisyklių 15.2 punkte.</p>
                <p>15.2. Pardavėjo nekontroliuojamas įvykis reiškia bet kokį veiksmą ar įvykį, kurio Pardavėjas pagrįstai negali kontroliuoti.</p>
                <p>15.3. Tuo atveju, jeigu įvyksta Pardavėjo nekontroliuojamas įvykis, kuris daro įtaką tinkamam Pardavėjo įsipareigojimų pagal Sutartį vykdymui:</p>
                <p>a) Pardavėjas nedelsdamas informuos Pirkėją; ir</p>
                <p>b) Pardavėjo įsipareigojimų, kylančių iš Sutarties, vykdymas bus sustabdytas ir įsipareigojimų įvykdymo terminas bus pratęstas Pardavėjo nekontroliuojamų įvykių trukmei. Jeigu Pardavėjo nekontroliuojami įvykiai daro įtaką Prekių pristatymui Pirkėjui, Pardavėjas suderins naują pristatymo datą po Pardavėjo nekontroliuojamų įvykių pabaigos.</p>
                <p>16. Informacijos siuntimas</p>
                <p>16.1. Taisyklėse vartojama sąvoka „raštu“ apima ir elektroninius laiškus.</p>
                <p>16.2. Pirkėjas, siekdamas susisiekti su Pardavėju raštu arba tuo atveju, jei Taisyklėse numatyta Pirkėjo pareiga susisiekti su Pardavėju raštu, siunčia Pardavėjui elektroninį laišką adresu info@treklama.lt  arba įprastą laišką UAB „Tauro paslaugos“, Daugėlių g. 79B, Kuršėnai, LT-81116 Šiaulių r. Pardavėjas Pirkėją apie pranešimo gavimą informuos raštu (dažniausiai elektroninio pašto laišku). Sutarties atsisakymo tikslu, Pirkėjo kreipimosi į Pardavėją tvarka numatyta šių Taisyklių 7 dalyje.</p>
                <p>16.3. Pardavėjas visus pranešimus Pirkėjui siunčia Pirkėjo pirkimo formoje pateiktu elektroninio pašto adresu.</p>
                <p>17. Kitos nuostatos</p>
                <p>17.1. Bet kokiai Sutarčiai, sudaromai tarp Pardavėjo ir Pirkėjo yra taikomos šios Taisyklės kartu su dokumentais, aiškiai nurodytais jose. Bet kokie nukrypimai nuo šių Taisyklių galioja tik tuo atveju, jeigu jie yra įforminami rašytiniu dokumentu.</p>
                <p>17.2. Pirkėjas, vadovaujantis Lietuvos Respublikos teisės aktais, turi tam tikras teises, susijusias su netinkamos kokybės Prekėmis. Jokia šių Taisyklių nuostata neturėtų būti interpretuojama kaip suvaržanti ar apribojanti naudojimąsi tokiomis teisėmis.</p>
                <p>17.3. Pardavėjas turi teisę perleisti savo teises ir pareigas pagal Sutartį trečiajam asmeniui ar asmenims, tačiau toks teisių ir pareigų perleidimas neturės jokios įtakos Pirkėjo teisėms bei Pardavėjo įsipareigojimams pagal šias Taisykles. Tokio perleidimo atveju Pardavėjas informuos Pirkėją, pateikdamas informaciją apie perleidimą internetinėje parduotuvėje.</p>
                <p>17.4. Pirkėjas neturi teisės perleisti ar perduoti visų ar dalies teisių ir įsipareigojimų, kylančių iš šių Taisyklių, trečiajam asmeniui ar asmenims be Pardavėjo rašytinio sutikimo.</p>
                <p>17.5. Jei kuri nors šių Taisyklių nuostatų yra teismo pripažįstama neteisėta, negaliojančia arba neįgyvendinama, kitos šių Taisyklių nuostatos lieka galioti ir veikti visa apimtimi. Bet kuri šių Taisyklių nuostata, pripažinta neteisėta, negaliojančia ar neįgyvendinama tik iš dalies ar tam tikra apimtimi, liks galioti ta apimtimi, kuria ji nebuvo pripažinta neteisėta, negaliojančia ar neįgyvendinama.</p>
                <p>17.6. Jeigu šiose Taisyklėse nėra nurodyta kitaip, bet koks Pardavėjo vėlavimas pasinaudoti teise pagal šią Sutartį nereiškia Pirkėjo atleidimo nuo įsipareigojimo vykdymo arba šios teisės atsisakymo, o atskiras arba dalinis bet kurio įsipareigojimo įvykdymas arba atskiras arba dalinis pasinaudojimas bet kuria teise nereiškia, kad šis įsipareigojimas neturi būti vykdomas arba šia teise negali būti naudojamasi toliau.</p>
                <p>17.7. Šioms Taisyklėms ir santykiams tarp šalių pagal šias Taisykles (įskaitant Sutarties sudarymo, galiojimo, negaliojimo, įgyvendinimo ir nutraukimo klausimus) taikomi Lietuvos Respublikos įstatymai ir jos aiškinamos remiantis Lietuvos Respublikos įstatymais.</p>
                <p>17.8. Kiekvienas ginčas, nesutarimas ar reikalavimas, kylantis iš šių Taisyklių ar susijęs su šiomis Taisyklėmis, jų pažeidimu, nutraukimu ar galiojimu, galutinai sprendžiamas Lietuvos Respublikos teisės aktų nustatyta tvarka.</p>
                <p>17.9. Prašymus ar skundus dėl Pardavėjo internetinėje parduotuvėje įsigytos Prekės Pirkėjas gali pateikti elektroninio vartotojų ginčų sprendimo platformoje <a href='http://ec.europa.eu/odr/' target="_blank" rel="noreferrer">http://ec.europa.eu/odr/</a>.</p>
                <p>17.10. Vartojimo ginčus neteismine tvarka sprendžia Valstybinė vartotojų teisių apsaugos tarnyba, buveinės adresas Vilniaus g. 25, LT-01402 Vilnius, <a href='http://www.vvtat.lt/' target="_blank" rel="noreferrer">www.vvtat.lt.</a></p>
            </Box>
        </Box>
    )
}

export default BuyRules
