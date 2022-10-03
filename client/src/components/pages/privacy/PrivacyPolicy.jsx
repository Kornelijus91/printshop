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


const PrivacyPolicy = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Privatumo politika | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcurmbs routes={[{path: 'privatumopolitika', name: 'Privatumo politika'}]}/>
                <h1>Privatumo politika</h1>
                <p><b>1. BENDROSIOS NUOSTATOS</b></p>
                <p>1.1. UAB „Tauro paslaugos“ (toliau - „mes“ arba <a href='https://www.treklama.lt'>„www.treklama.lt“</a>) yra įsipareigojusi saugoti ir gerbti Jūsų privatumą. Dedame visas pastangas, kad mūsų atliekamas asmens duomenų tvarkymas atitiktų 2016 m. balandžio 27 d. Europos Parlamento ir Tarybos Reglamentą (ES) 2016/679 dėl fizinių asmenų apsaugos tvarkant asmens duomenis ir dėl laisvo tokių duomenų judėjimo ir kuriuo panaikinama Direktyva 95/46/EB (Bendrasis duomenų apsaugos reglamentas).</p>
                <p>1.2. Jūsų asmens duomenų valdytojas yra UAB „Tauro paslaugos“, juridinio asmens kodas 305328121, adresas Daugėlių g. 79B, Kuršėnai, LT-81116 Šiaulių r., el. paštas info@treklama.lt. </p>
                <p>1.3. Prašome įdėmiai perskaityti šią Privatumo politiką, kad suprastumėte, kokiais tikslais renkame Jūsų duomenis, taip pat, kaip juos naudosime.</p>
                <p>1.4. Pirmą kartą lankantis mūsų interneto svetainėje mes paprašysime Jūsų patvirtinti, jog sutinkate, kad būtų naudojami slapukai šioje Privatumo politikoje išdėstytomis sąlygomis.</p>
                <p><b>2. KOKIUS JŪSŲ ASMENS DUOMENIS NAUDOJAME</b></p>
                <p>2.1. Jūsų vardas, pavardė, mokėtojo adresas, pristatymo adresas ir kontaktiniai duomenys (Jūsų elektroninio pašto adresas, telefono numeris, Facebook/Google/Linkedin paskyra). Šie duomenys naudojami tik konkrečiai su užsakymų susijusiems veiksniams (Gamyba, pristatymas, sąskaitos faktūros išrašymas).</p>
                <p>2.2. Jūsų mokėjimo informacija. Duomenys naudojami priimant ir gražinant Klientams pinigus.</p>
                <p>2.3. Jūsų bendravimo su mumis istorija. Duomenys naudojami teikiant paslaugas ir pagalbą, siekdami užtikrinti vienodos ir geros kokybės aptarnavimą bei apsaugoti mūsų interesus.</p>
                <p>2.4. Pirkimo ir veiksmų istorija. Duomenys naudojami parduodant Jums prekes.</p>
                <p>2.5. Informacija apie Jūsų įrenginį. Duomenys naudojami rinkti informacija, kurią pateikiate mums naršydami mūsų interneto svetainėje įskaitant interneto protokolo (IP) adresą ir įrenginio tipą, ekrano skiriamąją gebą ir (pasirinkus informacijos bendrinimą su mumis), taip pat informaciją apie tai, kaip naudojatės mūsų interneto svetaine.</p>
                <p>2.6. Informacija, gaunama Jums jungiantis per „Google“, „Facebook“ ir „Linked In“. Duomenys naudojami siekiant suteikti galimybę patogiau prisijungti prie mūsų interneto svetainės, kai jungiatės per „Google“, „Facebook“  ir „Linked In“, iš minėtų paslaugų teikėjų gausime prisijungimui reikalingus duomenis.</p>
                <p>2.7. Mes naudojame Jūsų asmens duomenis šioje Privatumo politikoje nurodytais tikslais ir tais atvejais, kai būtina vykdyti arba ginti teisėtus reikalavimus. Dėl šios priežasties Jūsų asmens duomenis mes tvarkome remdamiesi teisėto intereso pagrindu, siekdami apginti bei užtikrinti savo, Jūsų ir kitų teises.</p>
                <p>2.8. Jūsų asmens duomenis taip pat galime tvarkyti, kai tai yra būtina siekiant vykdyti mums privalomą teisinę prievolę arba apsaugoti Jūsų arba kito fizinio asmens gyvybiškai svarbius interesus.</p>
                <p><b>3. KOKIUS ASMENS DUOMENIS PERDUODAME TRETIESIEMS ASMENIMS</b></p>
                <p>3.1. Mes norime įgyti ir išlaikyti Jūsų pasitikėjimą, todėl Jūsų asmens duomenis perduosime tik būtinais atvejais.</p>
                <p>3.2. Jūsų asmens duomenis galime perduoti toliau išvardytų kategorijų duomenų gavėjams:</p>
                <p>3.2.3. Su prekių pirkimu susijusias finansines operacijas interneto svetainėje gali tvarkyti mūsų mokėjimo paslaugų teikėjai. Jūsų finansinių operacijų duomenis savo mokėjimo paslaugų teikėjams atskleidžiame tik tiek, kiek būtina mokėjimo operacijoms atlikti, pinigams grąžinti ir skundams nagrinėti;</p>
                <p>3.2.4. Specifinėms paslaugoms teikti Jūsų asmens duomenis galime perduoti kitiems paslaugų teikėjams, pavyzdžiui, interneto svetainės paslaugų teikėjams, kurjerių tarnyboms, serverių ir jų techninės priežiūros paslaugų teikėjams, elektroninio pašto paslaugų teikėjams, naujienlaiškių siuntimo, apklausų vykdymo, socialinių tinklų paskyrų administravimo, klientų aptarnavimo centrų, duomenų apsaugos pareigūno paslaugų teikėjams.</p>
                <p>3.3. Mes pasitelkiame tik tuos paslaugų teikėjus, kurie yra įdiegę/įsipareigoja įdiegti atitinkamas technines ir organizacines priemones, kurios užtikrintų atitinkamą duomenų tvarkymo saugos lygį, atitinkantį fizinių asmenų, kurių duomenys bus tvarkomi pagal duomenų tvarkymo sutartį, teisių ar laisvių pažeidimo riziką, o toks duomenų tvarkymas atitiktų Bendrojo duomenų apsaugos reglamento reikalavimus.</p>
                <p>3.5. Šioje dalyje nurodyti duomenų gavėjai taip pat gali būti įsisteigę už Lietuvos Respublikos, Europos Sąjungos ar Europos ekonominės erdvės ribų. Jūsų asmens duomenis perduosime tik tokiems tretiesiems asmenims, kurie laikosi Bendrojo duomenų apsaugos reglamento nustatytų reikalavimų.</p>
                <p>3.6. Socialinių tinklų valdytojai renka statistinius duomenis apie socialinio tinklo naudotojų veiksmus (bendras peržiūrų skaičius, „patinka“ paspaudimai, reakcijos į įrašus, vaizdo įrašų peržiūros, šalis ir miestas, kalba, amžius, interesai, elgesys, naudojami prietaisai, lytis, ir pan.) ir šie statistiniai duomenys gali būti prieinami UAB „Tauro paslaugos“. Mes kartu su socialinių tinklų „Facebook“ ir „Instagram“ valdytoju Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour Dublin 2 Ireland, esame bendri duomenų valdytojai. Už informacijos apie duomenų tvarkymą, bendrų duomenų valdytojų susitarimo sąlygų teikimą, duomenų subjektų teisių įgyvendinimą yra atsakinga įmonė Facebook Ireland Ltd. Minėtą informaciją galite rasti atitinkamo socialinio tinklo interneto svetainėje.</p>
                <p><b>4. KIEK LAIKO SAUGOME JŪSŲ ASMENS DUOMENIS</b></p>
                <p>4.1. Visais atvejais Jūsų asmens duomenis saugome ne ilgiau, nei būtina konkretiems tikslams pasiekti. Neaktyvių vartotojų duomenys naikinami kas 2 metus.</p>
                <p><b>5. RINKODAROS PRANEŠIMAI</b></p>
                <p>5.1. Jums sutikus, elektroniniu paštu, SMS žinutėmis, skambindami Jūsų nurodytu telefono ryšio numeriu Jums teiksime rinkodaros pranešimus, kad sužinotumėte mūsų naujienas ir galėtumėte susipažinti su mūsų produktais ir juos rasti.</p>
                <p>5.2. Jūs galite bet kuriuo metu atsisakyti tiesioginės rinkodaros pranešimų, teikiamų iš <a href='https://www.treklama.lt'>www.treklama.lt</a>. Tai galite padaryti:</p>
                <p>5.3. rašydami elektroniniu paštu info@treklama.lt arba pasinaudodami atšaukimo nuoroda Jums elektroniniu paštu siųstame pranešime arba pokalbio su mūsų darbuotoju metu.</p>
                <p>5.4. Jums atsisakius tiesioginės rinkodaros pranešimų, mes atnaujinsime Jūsų asmens duomenų tvarkymo nustatymus, kad tiesioginės rinkodaros pranešimai Jums nebebūtų teikiami.</p>
                <p>5.5. Atsisakius tiesioginės rinkodaros pranešimų, informacija apie Jūsų užsakytas paslaugas (pavyzdžiui, naujausia informacija apie užsakymą) bus ir toliau Jums teikiama.</p>
                <p><b>6. JŪSŲ TEISĖS</b></p>
                <p>6.1. Šioje Privatumo politikos dalyje apžvelgiame duomenų apsaugos teisės aktuose numatytas Jūsų teises. Kai kurios teisės apima daug aspektų, todėl šioje Privatumo politikoje pristatome tik pagrindinius. Rekomenduojame susipažinti su atitinkamais teisės aktais ir priežiūros institucijų gairėmis, kad žinotumėte visą informaciją apie šias teises.</p>
                <p>6.2. Jūs turite šias su asmens duomenų apsauga susijusias teises:</p>
                <p>6.2.1. teisę gauti informaciją apie asmens duomenų tvarkymą;</p>
                <p>6.2.2. teisę susipažinti su savo asmens duomenimis, kuriuos mes saugome;</p>
                <p>6.2.3. teisę reikalauti ištaisyti Jūsų asmens duomenis, kuriuos mes saugome (daugelį jų galite ištaisyti prisijungę prie savo paskyros);</p>
                <p>6.2.4. teisę paprašyti, kad mes pašalintume Jūsų asmens duomenis („teisė būti pamirštam“);</p>
                <p>6.2.5. teisę apriboti Jūsų asmens duomenų tvarkymą;</p>
                <p>6.2.6. teisę nesutikti, kad būtų tvarkomi Jūsų asmens duomenys;</p>
                <p>6.2.7. teisę nesutikti, kad Jūsų asmens duomenys būtų tvarkomi tiesioginės rinkodaros tikslais;</p>
                <p>6.2.8. teisę į duomenų perkeliamumą;</p>
                <p>6.2.9. teisę atšaukti sutikimą tvarkyti Jūsų asmens duomenis;</p>
                <p>6.2.10. teisę pateikti skundą priežiūros institucijai.</p>
                <p>6.3. Jei norite įgyvendinti savo teises, arba turite klausimų dėl Jūsų asmens duomenų tvarkymo ar teisių įgyvendinimo, rašykite mums elektroninio paštu info@treklama.lt.</p>
                <p>6.4. Teisė gauti informaciją apie asmens duomenų tvarkymą. Informaciją apie Jūsų asmens duomenų tvarkymą pateikiame duomenų rinkimo metu. Ją taip pat galite visada rasti šioje Privatumo politikoje arba gauti kreipdamiesi elektroniniu paštu info@treklama.lt.</p>
                <p>6.5. Teisė susipažinti su savo asmens duomenimis, kuriuos mes tvarkome. Jūs turite teisę gauti iš mūsų patvirtinimą ar tvarkome Jūsų asmens duomenis. Mums tvarkant Jūsų asmens duomenis, Jūs turite teisę susipažinti su tvarkomais asmens duomenimis ir informacija apie jų tvarkymą, tokia kaip asmens duomenų tvarkymo tikslai, asmens duomenų kategorijos, asmens duomenų gavėjai ir kt. Mes Jums pateiksime Jūsų asmens duomenų kopiją. Jūs turite teisę gauti savo asmens duomenis susistemintu, įprastai naudojamu ir kompiuterio skaitomu formatu. Tačiau šia teise negalėsite pasinaudoti tais atvejais, kai ji gali neigiamai paveikti kitų teises ir laisves.</p>
                <p>6.6. Mes turime teisę atsisakyti pateikti Jūsų tvarkomus duomenis, jei nustatomos teisės aktuose nurodytos aplinkybės, kurioms esant asmens duomenys nėra teikiami.</p>
                <p>6.7. Teisė reikalauti ištaisyti Jūsų asmens duomenis, kuriuos mes saugome. Jūs turite teisę patikslinti visus netikslius savo asmens duomenis ir, atsižvelgiant į tvarkymo tikslus, papildyti visus neišsamius savo asmens duomenis.</p>
                <p>6.8. Teisė ištrinti Jūsų asmens duomenis. Šia teise galite pasinaudoti, kai: (i) asmens duomenų nebereikia, kad būtų pasiekti tikslai, kuriems jie buvo renkami ar kitaip tvarkomi; (ii) atšaukiate savo sutikimą ir nėra kito teisinio pagrindo tvarkyti duomenis; (iii) nesutinkate, kad asmens duomenys būtų tvarkomi siekiant teisėto mūsų arba trečiosios šalies intereso; (iv) asmens duomenys tvarkomi tiesioginės rinkodaros tikslais, (v) asmens duomenys buvo tvarkomi neteisėtai; (vi) asmens duomenys turi būti ištrinti laikantis mums taikomų teisės aktų reikalavimų. Atkreipiame Jūsų dėmesį, kad tam tikrais atvejais šia teise pasinaudoti negalėsite dėl taikomų išimčių. Šios išimtys apima atvejus, kai tvarkyti asmens duomenis yra būtina siekiant: (i) pasinaudoti saviraiškos ir informacijos laisve; (ii) įgyvendinti mūsų teisinius įsipareigojimus; arba (iii) pareikšti, vykdyti arba ginti teisinius reikalavimus.</p>
                <p>6.9. Teisė apriboti Jūsų duomenų tvarkymą. Šia teise galima pasinaudoti tokiais atvejais: (i) Jums ginčijant asmens duomenų tikslumą; (ii) kai asmens duomenys tvarkomi neteisėtai, tačiau Jūs nenorite, kad jie būtų ištrinti; (iii) kai asmens duomenų nebereikia mūsų duomenų tvarkymo tikslais, tačiau Jūs jų prašote dėl teisinių reikalavimų pareiškimo, vykdymo ar gynimo, arba (iv) Jums nesutikus, kad jie būtų tvarkomi remiantis teisėtu mūsų arba trečiosios šalies interesu, kol bus patikrintas Jūsų nesutikimo pagrindas. Apribojus asmens duomenų tvarkymą, mes galime toliau saugoti Jūsų asmens duomenis, tačiau toliau jų netvarkysime, išskyrus: (i) turėdami Jūsų sutikimą; (ii) dėl teisinių reikalavimų pareiškimo, vykdymo ir gynimo; (iii) siekdami apsaugoti kitų fizinių ar juridinių asmenų teises arba (iv) dėl svarbaus viešojo intereso.</p>
                <p>6.10. Teisė nesutikti, kad būtų tvarkomi Jūsų asmens duomenys. Šia teise galite pasinaudoti bet kokiu tikslu dėl priežasčių, susijusių su Jūsų konkrečia situacija, tačiau tik tokiu mastu, kiek duomenis naudojame dėl mūsų ar trečiosios šalies teisėtų interesų. Jums pareiškus nesutikimą, mes nebetvarkysime asmens duomenų, išskyrus atvejus, kai galime įrodyti, kad duomenys tvarkomi dėl įtikinamų teisėtų priežasčių, kurios yra viršesnės už Jūsų interesus, teises ir laisves, arba siekdami pareikšti, vykdyti ar apginti teisinius reikalavimus ir (ar) teisėtus mūsų reikalavimus.</p>
                <p>6.11. Teisė nesutikti, kad Jūsų asmens duomenys būtų tvarkomi tiesioginės rinkodaros tikslais (įskaitant profiliavimą tiesioginės rinkodaros tikslais). Jums su tuo nesutikus, mes nebetvarkysime Jūsų asmens duomenų šiuo tikslu.</p>
                <p>6.12. Teisė į duomenų perkeliamumą. Šią teisę galėsite įgyvendinti tais atvejais, kai Jūsų asmens duomenis tvarkome automatizuotomis priemonėmis (kompiuteriais ir pan.) ir asmens duomenų tvarkymo teisinis pagrindas yra:</p>
                <p>6.12.1. Jūsų sutikimas, arba</p>
                <p>6.12.2. sutarties vykdymas ar veiksmai, atlikti Jūsų prašymu prieš sudarant sutartį.</p>
                <p>6.13. Teisė atšaukti sutikimą tvarkyti Jūsų asmens duomenis. Tais atvejais, kai Jūsų asmens duomenų tvarkymo teisinis pagrindas yra sutikimas, Jūs turite teisę bet kuriuo metu atšaukti sutikimą. Sutikimo atšaukimas neturės įtakos duomenų tvarkymo teisėtumui iki atšaukimo.</p>
                <p>6.14. Teisė pateikti skundą priežiūros institucijai. Jei manote, kad tvarkydami Jūsų asmens duomenis pažeidžiame asmens duomenų apsaugą reglamentuojančius teisės aktus, Jūs turite teisę pateikti skundą Valstybinei duomenų apsaugos inspekcijai, kurios buveinės adresas L. Sapiegos g. 17, LT-10312 Vilnius, <a href='http://www.vdai.lrv.lt' target='_blank' rel="noreferrer">www.vdai.lrv.lt.</a> Visais atvejais, prieš teikdami skundą, susisiekite su mumis, kad kartu galėtume rasti tinkamą sprendimą.</p>
                <p><b>8. VAIKŲ ASMENS DUOMENŲ TVARKYMAS</b></p>
                <p>8.1 Tvarkant nepilnamečio asmens duomenis sutikimo pagrindu informacinės visuomenės paslaugų siūlymui, toks duomenų tvarkymas yra teisėtas, jei nepilnametis yra sulaukęs bent 16 metų. Jeigu tokiam nepilnamečiui nėra 16 metų, toks tvarkymas yra teisėtas tik tokiu atveju, jei sutikimą davė arba tvarkyti duomenis leido nepilnamečio tėvai arba globėjai, todėl:</p>
                <p>8.2 Jeigu Jūs esate jaunesnis nei 18 metų, bet jau sulaukęs 16 metų, naudodamiesi mūsų Elektroninės parduotuvės paslaugomis, Jūs patvirtinate, jog turite savo tėvų, globėjų pritarimą dėl Jūsų asmeninės informacijos atskleidimo Bendrovei; jeigu Jūs esate jaunesnis nei 16 metų, naudotis mūsų Elektroninės parduotuvės paslaugomis ir turiniu galite tik Jūsų tėvams, globėjams dėl to davus sutikimą Bendrovei. </p>
                <p><b>9. PRIVATUMO POLITIKOS PAKEITIMAI</b></p>
                <p>9.1. Mes periodiškai galime keisti šią Privatumo politiką, kad ji tinkamai atspindėtų kaip tvarkome Jūsų asmens duomenis.</p>
                <p>9.2. Atlikę reikšmingų pakeitimų, apie tai pranešime interneto svetainėje arba kitomis atitinkamomis susisiekimo priemonėmis, pavyzdžiui, elektroniniu paštu, kad Jūs galėtumėte peržiūrėti šiuos pakeitimus prieš toliau naudodamiesi mūsų interneto svetaine.</p>
            </Box>
        </Box>
    )
}

export default PrivacyPolicy
