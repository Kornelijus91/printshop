import { makeStyles } from '@material-ui/core/styles';
import { Box, Breadcrumbs } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import { Link } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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

const BuyRules = () => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Helmet>
                <title>Pirkimo taisykl??s | {ProjectName}</title>  
            </Helmet>
            <Box className={classes.body}>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/pirkimotaisykles' className={classes.breadcrumbLinkDisabled}>Pirkimo taisykl??s</Link>
                </Breadcrumbs>
                <h1>Pirkimo taisykl??s</h1>
                <p>1. Bendrosios nuostatos</p>
                <p>1.1.????ios pirkimo taisykl??s, kartu su dokumentais, nurodytais ??iose taisykl??se, yra skirtos suteikti informacij?? apie UAB ???Tauro paslaugos??? (???Pardav??jas???) bei i??d??styti asmenims, ??sigyjantiems prekes (???Prek??s???) internetin??je parduotuv??je (???Pirk??jas???), Preki??, parduodam?? ??ioje??internetin??je parduotuv??je, pardavimo s??lygas (???Taisykl??s???).</p>
                <p>1.2.????ios Taisykl??s yra taikomos sudarant bet kokias sutartis tarp Pardav??jo ir Pirk??jo d??l Preki?? pardavimo (???Sutartis???). Prie?? vykdant bet koki?? Preki?? u??sakym????internetin??je parduotuv??je, pra??ome atid??iai perskaityti ??ias Taisykles ir ??sitikinti, kad jas tinkamai supratote. Pra??ome atkreipti d??mes??, kad prie?? u??baigdamas u??sakym?? Pirk??jas privalo sutikti su ??iomis Taisykl??mis bei??Privatumo politika, o atsisakius tai padaryti, u??sakymo u??baigimas ir Prek??s u??sakymas yra negalimas.</p>
                <p>1.3. Pirk??jas yra skatinamas atsispausdinti ??ias Taisykles ateities reikm??ms.</p>
                <p>1.4.??Taip pat informuojame, kad ??ios Taisykl??s gali b??ti kei??iamos 6 dalyje nustatyta tvarka. Kiekvien?? kart?? u??sakant Prekes, rekomenduojame per??i??r??ti Taisykles tam, kad Pirk??jas b??t?? ??sitikin??s, jog pilnai supranta kokiomis s??lygomis, konkre??iu atveju, bus daromas u??sakymas.</p>
                <p>1.5.????ios Taisykl??s ir bet kokios Sutartys tarp Pardav??jo ir Pirk??jo yra sudaromos tik nacionaline kalba.</p>
                <p>2. Informacija apie Pardav??j??</p>
                <p>2.1.????ios Taisykl??s yra taikomos ??sigyjant Prekes adresu??https://www.treklama.lt. Pardav??jas yra UAB ???Tauro paslaugos???, Lietuvos bendrov??, tinkamai ??registruota ir veikianti Lietuvos Respublikoje, juridinio asmens kodas 305328121, buvein??s adresas Daug??li?? g. 79B, Kur????nai, LT-81116 ??iauli?? r. Duomenys apie Pardav??j?? kaupiami ir saugomi ??? Juridini?? asmen?? registre, registro tvarkytojas Valstyb??s ??mon?? Registr?? centras. Pardav??jo PVM mok??tojo kodas LT100012761116.</p>
                <p>2.2.??Daugiau informacijos apie Pardav??j?? pateikiama skiltyje ???Apie mus???.</p>
                <p>2.3.??Pardav??jo kontaktin?? informacija pateikiama skiltyje ???Kontaktai???.</p>
                <p>3. Prek??s</p>
                <p>3.1. Internetin??je parduotuv??je pateikiami Preki?? atvaizdai yra iliustracinio pob??d??io. </p>
                <p>3.2.??Did??ioji dalis preki?? parduotuv??je yra unikalios ir gaminamos konkre??iai Pirk??jui pagal jo pateiktus failus, nuotraukas ar maketus. Pardav??jas negali garantuoti, kad Pirk??jo ??renginio ekranas tiksliai atspind??s Preki?? spalvas. Pirk??jas supranta, kad Prek??s gali ne??ymiai skirtis nuo j?? atvaizd?? J??s?? kompiuteryje/plan??et??je/ telefone ar kituose ekranuose.</p>
                <p>3.3.??Pirk??jui reik??t?? nepamir??ti, kad skaitmenin??je erdv??je matomas maketas gali neatitikti mastelio, tod??l vaizdas gautas spaudos gaminyje gali ??iek tiek skirtis, taip pat maketas atspausdintas ant vieno arba kito popieriaus gali tur??ti ??takos spalv?? skirtumui. Popierius taip pat turi ??takos gaminio spaudai.</p>
                <p>3.4.??Prek??s, pateikiamos??internetin??je parduotuv??je, yra prieinamos. Tuo atveju, jeigu u??sakytos Prek??s nebelieka, Pirk??jas yra nedelsiant apie tai informuojamas elektroniniu pa??tu ar kitomis priemon??mis (skambu??iu ir/arba SMS ??inute) ir tokios Prek??s u??sakymo vykdymas yra nutraukiamas arba sutariamas kitas preki?? pristatymo terminas.</p>
                <p>4. Asmens duomen?? tvarkymas</p>
                <p>4.1. Pardav??jas Pirk??jo asmens duomenis tvarko vadovaudamasis??Privatumo politika. Atsi??velgiant ?? tai, kad Privatumo politikoje nurodomos svarbios Taisykli?? nuostatos, rekomenduojama, kad Pirk??jas atid??iai jas perskaityt?? ir b??t?? ??sitikin??s, kad visos Privatumo politikos nuostatos jam yra suprantamos ir priimtinos.</p>
                <p>5.??Pirkimo pardavimo sutarties sudarymas</p>
                <p>5.1.????ioje??internetin??je parduotuv??je Prekes ??sigyti gali Pirk??jai:</p>
                <p>a) fiziniai asmenys;</p>
                <p>b)??juridiniai asmenys.</p>
                <p>5.2. Pardav??jo nustatyta Preki?? u??sakymo tvarka suteikia Pirk??jui galimyb?? patikrinti ir i??taisyti klaidas, prie?? teikiant galutin?? u??sakym??. Rekomenduojama, kad Pirk??jas atid??iai perskaityt?? ir patikrint?? teikiam?? u??sakym??, kiekviename u??sakymo teikimo etape.</p>
                <p>5.3.??Sutartis tarp Pirk??jo ir Pardav??jo laikoma sudaryta nuo tada, kai Pirk??jas, internetin??je parduotuv??je suformav??s Preki?? krep??el??, nurod??s Pirk??jo vard??, pavard?? (lotyni??komis raid??mis) ir pristatymo adres??, tiksl?? pa??to kod??, kontaktinio telefono numer??, pasirink??s mok??jimo b??d?? ir susipa??in??s su ??iomis Taisykl??mis, paspaud??ia mygtuk?? ???U??sakyti??? ir apmoka u??sakym?? arba pasirenka apmok??jimo b??d??, nurodyt?? 10.1 punkto b dalyje. U??sakymo neapmok??jus sutartis laikoma nesudaryta. Pardav??jas turi teis?? susisiekti su Pirk??ju u??sakyme nurodytu telefono numeriu arba elektroniniu pa??tu sudarytos sutarties pagrindu arba sprend??iant i??kilusius neai??kumus d??l sutarties vykdymo.</p>
                <p>5.4.??Pirk??jui pateikus ir apmok??jus u??sakym?? arba pasirinkus 10.1 punkto b dalyje nurodyt?? mok??jimo b??d?? -??jam i??siun??iamas elektroninis lai??kas, patvirtinantis u??sakymo gavim??.</p>
                <p>5.5.??Paruo??us u??sakym??, Pardav??jas i??siun??ia Pirk??jui elektronin?? lai??k?? ir/ar trump??j????SMS ??inut??, informuojan??i??, kad Prek??s i??si??stos Pirk??jui arba parengtos atsi??mimui atsi??mimo punkte.</p>
                <p>5.6.??Kiekviena tarp Pirk??jo ir Pardav??jo sudaryta Sutartis (u??sakymas) yra registruojama ir saugoma??internetin??s parduotuv??s duomen?? baz??je.</p>
                <p>5.7.??Sudarydamas Sutart?? Pirk??jas sutinka, kad pirkimo metu nurodytu elektroninio pa??to adresu bus siun??iama u??sakymo elektronin?? PVM s??skaita fakt??ra su pirkimo duomenimis. S??skaita fakt??ra siun??iama el. pa??tu ne v??liau kaip per 6 (??e??ias) darbo dienas nuo momento, kai Pirk??jas atsiima Prekes?? ar Pardav??jas perduoda Prekes kurjeriui (jei Prek??s Pirk??jui pristatomos naudojantis kurjerio paslaugomis). </p>
                <p>5.8.??Tuo atveju, jeigu Pardav??jas neturi galimyb??s parduoti Prek??, pavyzd??iui, d??l to, kad prek?? neb??ra parduodama arba d??l klaidos, susijusios su??internetin??je parduotuv??je pateikiama kaina, kaip tai nurodyta ??i?? Taisykli?? 9.5 punkte, Pardav??jas informuos Pirk??j?? elektroniniu pa??tu ar kitomis priemon??mis (skambu??iu ir/arba SMS ??inute) ir u??sakymas nebus vykdomas. Tuo atveju, jeigu Pirk??jas jau bus sumok??j??s u?? Prek??, Pardav??jas gr????ins sumok??tas sumas per 5 (penkias) kalendorines dienas.</p>
                <p>6. Teis?? keisti taisykles</p>
                <p>6.1. Pardav??jas pasilieka teis?? keisti ??ias Taisykles, ??skaitant, bet neapsiribojant, d??l:</p>
                <p>a)??apmok??jimo s??lyg?? keitimo;</p>
                <p>b)??taikytin?? teis??s akt?? pakeitim??.</p>
                <p>6.2.??Kiekvien?? kart?? u??sisakant Prekes, Sutarties tarp Pardav??jo ir Pirk??jo sudarymo tikslais, galios tuo metu galiojanti Taisykli?? redakcija.</p>
                <p>6.3.??Kiekvien?? kart?? pasikeitus Taisykl??ms, remiantis ??iuo Taisykli?? 6 punktu, Pardav??jas informuos Pirk??j?? ir prane?? apie tai, nurodydamas, kad Taisykl??s buvo pakeistos ir j?? pakeitimo data bus pateikiama ??i?? Taisykli?? 1.4 punkte.</p>
                <p>7.??Preki?? gr????inimas, Sutarties atsisakymas</p>
                <p>Atsi??velgiant ?? produktus parduodamus internetin??je parduotuv??je, gr????inimo negalima atlikti, kai u??sakymas jau yra vykdomas ir/ ar i??si??stas.</p>
                <p>7.1 Kokybi??kos prek??s  yra nekei??iamos, negr????inamos.</p>
                <p>7.2 Preki?? tr??kumai ??alinami ar kei??iami, jei d??l darbu ar produkto tr??kum?? yra atsakingas Pardav??jas.</p>
                <p>7.3 Jei d??l preki?? tr??kum?? yra atsakingas Pardav??jas ir ne??manoma produkcijos tr??kum?? i??taisyti/pa??alinti/pakeisti, Pirk??jo sumok??ti pinigai u?? ??i?? produkcij?? yra gr????inami ?? mok??tojo banko s??skait?? per 5 (penkias) darbo dienas.</p>
                <p>7.4 Pageidaujant gr????inti/pakeisti nekokybi??k?? prek?? b??tina laikytis papildom?? s??lyg??:</p>
                <p>a) Produkcija turi b??ti Pirk??jo nesugadinta;</p>
                <p>b) Gr????inama prek?? turi b??ti Pardav??jo pakuot??je arba kitoje, u??tikin??ioje saug?? transportavim?? pakuot??je;</p>
                <p>c) Produkcija turi b??ti gr????inama Pardav??jo buvein??s adresu: Daug??li?? g. 79B, Kur????nai, LT-81116 ??iauli?? r.</p>
                <p>7.5 Pardav??jas turi teis?? atsisakyti priimti Pirk??jo gr????inam?? prek??, jei buvo nesilaikoma produkcijos gr????inimo s??lyg??.</p>
                <p>8.??Pristatymas</p>
                <p>Pristatymas ?? namus</p>
                <p>8.1. Pirk??jo pasirinkimu, Prekes Pirk??jo s??skaita pristato transporto ??mon??. Atskirais Pardav??jo nurodytais atvejais Prek??s pristatomos Pardav??jo s??skaita.</p>
                <p>8.2.??Pirk??jas u??sakymo metu pasirinkdamas Preki?? pristatymo paslaug??, ??sipareigoja nurodyti tiksli?? Preki?? pristatymo viet??. Tiksli pristatymo kaina priklauso nuo u??sakom?? Preki?? svorio ir kainos.</p>
                <p>8.3.??Pirk??jo u??sakymas ??vykdomas iki planuojamos pristatymo dienos, nurodytos 5.6 punkte nurodytame prane??ime apie i??siuntim??, i??skyrus atvejus, kai ??vyksta Pardav??jo nekontroliuojami ??vykiai (kaip jie yra apibr????ti ??i?? Taisykli?? 15 dalyje).</p>
                <p>8.4.??Pirk??jas visada yra informuojamas apie numatom?? Prek??s pristatymo termin?? elektroniniu pa??tu.</p>
                <p>8.5.??Nuosavyb??s teis?? ?? Prek?? pereina Pirk??jui nuo momento, kai kurjeris perduoda Prekes Pirk??jui arba atsiima atsi??mimo punktuose. Preki?? atsitiktinio ??uvimo ar sugedimo rizika pereina Pirk??jui, kai jis ar jo nurodytas asmuo, i??skyrus kurjer??, priima prekes.</p>
                <p>8.6.??Siuntos pristatymo metu Pirk??jas ar, atsi??velgiant ?? atvej??, Pirk??jo atstovas privalo kartu su transporto ??mon??s atstovu patikrinti siuntos pakuot??s b??kl??, vadovaujantis kurjeri?? paslaugas teikian??ios (-i??) organizacijos (-??) taisykl??mis.</p>
                <p>8.7.??Nusta??ius siuntos pakuot??s pa??eidim??, Pirk??jas ar, atsi??velgiant ?? atvej??, Pirk??jo atstovas turi teis?? siuntos nepriimti. Tokiu atveju kurjeri?? paslaugas teikian??ios organizacijos atstovas kartu su Pirk??ju ar, atsi??velgiant ?? atvej??, Pirk??jo atstovu u??pildo special?? siunt?? patikrinimo akt??, pateikiam?? kurjeri?? paslaugas teikian??ios organizacijos atstovo, kuriame nurodo rastus pa??eidimus.</p>
                <p>8.8.??Pirk??jui ar, atsi??velgiant ?? atvej??, Pirk??jo atstovui pri??mus siunt?? ir pasira??ius kurjeri?? paslaugas teikian??ios organizacijos atstovo pateiktame duomen?? kaupiklyje arba popieriniame pristatymo patvirtinime be pastab??, laikoma, kad Prek??s pristatytos nepa??eistoje siuntos pakuot??je, papildomos paslaugos, nurodytos duomen?? kaupiklyje arba popieriniame pristatymo patvirtinime, tinkamai atliktos, jei ne??rodoma prie??ingai.</p>
                <p>8.9.??Prista??ius ir perdavus Prekes Pirk??jo nurodytu adresu, laikoma, kad Prek??s Pirk??jui yra perduotos, neatsi??velgiant ?? tai, ar Prekes fakti??kai priima Pirk??jas, ar bet kuris kitas asmuo, pri??m??s Prekes nurodytu adresu. Jei planuojam?? Preki?? pristatymo dien?? Prek??s nepristatomos, Pirk??jas nedelsdamas, bet ne v??liau kaip kit?? dien?? po planuotos Preki?? pristatymo dienos, apie tai informuoja Pardav??j??.</p>
                <p>8.10. Jei Prekes priims ne Pirk??jas, Pirk??jas privalo nurodyti Prekes priimsian??io asmens duomenis, pildydamas u??sakymo pristatymo informacij??.</p>
                <p>8.11.??Priimant Prekes b??tina pateikti galiojant?? asmens tapatyb?? patvirtinant?? dokument??, tam, kad b??t?? tinkamai identifikuotas Pirk??jas. Jei Pirk??jas Preki?? pats priimti negali, o Prek??s pristatytos Pirk??jo nurodytu adresu, Pirk??jas neturi teis??s reik??ti Pardav??jui pretenzij?? d??l Preki?? pristatymo netinkamam asmeniui.</p>
                <p>8.12.??Pirk??jas privalo per 14 (keturiolika) dien?? nuo Preki?? pristatymo momento patikrinti Preki?? pakuotes, kiek??, kokyb??, asortiment??, komplekti??kum?? ir komplektacij??. Pirk??jui per nurodyt?? termin?? ne??vykd??ius ??ios pareigos ir neparei??kus Pardav??jui pretenzij??, laikoma, kad Preki?? pakuot??s yra tinkamos, o kiekis, kokyb??, asortimentas, komplekti??kumas ir komplektacija atitinka Sutarties s??lygas.</p>
                <p>9.??Preki?? kaina ir pristatymo i??laidos??</p>
                <p>9.1.??Preki?? kainos bus tokios, kokios yra nurodytos??internetin??je parduotuv??je. Pardav??jas deda visas protingas pastangas tam, kad u??tikrint??, kad Preki?? kainos, tuo metu, kai Pirk??jas pateikin??ja u??sakym??, b??t?? teisingos. Jeigu, Pardav??jas pastebi, kad Preki?? kainose yra netikslum??, taikomas ??i?? Taisykli?? 9.5 punktas.</p>
                <p>9.2.??Preki?? kainos gali keistis, ta??iau tokie pasikeitimai netur??s ??takos jau sudarytoms Sutartims.</p>
                <p>9.3.??Preki?? kainos pateikiamos ??skaitant PVM (ten, kur jis taikomas) tokio dyd??io, kuris taikomas konkre??iu metu Lietuvos Respublikoje. Tuo atveju, jeigu PVM dydis keist??si laikotarpiu nuo u??sakymo dienos iki pristatymo dienos, kaina gali keistis, atsi??velgiant ?? PVM dyd??io pasikeitim??, i??skyrus tuos atvejus, kai Pirk??jas u?? Prekes visi??kai atsiskait?? prie?? ??sigaliojant PVM dyd??io pakeitimui. Pardav??jas apie tok?? kainos pasikeitim?? ra??tu informuoja Pirk??j?? ir suteikia galimyb?? Pirk??jui ??sigyti Prek?? u?? kain??, pakoreguot??, atsi??velgiant ?? pasikeitus?? PVM dyd?? arba at??aukti u??sakym??. U??sakymas n??ra vykdomas tol, kol negaunamas Pirk??jo atsakymas. Tuo atveju, jeigu su Pirk??ju nepavyksta susisiekti jo nurodytais kontaktais, laikoma, kad u??sakymas yra at??auktas ir Pirk??jas apie tai informuojamas ra??tu.</p>
                <p>9.4.??Preki?? kainos neapima u??sakymo paruo??imo,??pristatymo i??laid??. Pristatymo i??laid?? dydis nurodomos internetin??je parduotuv??je gali keistis.</p>
                <p>9.5.??Atsi??velgiant ?? tai, kad Pardav??jo??internetin??je parduotuv??je pateikiamas itin platus Preki?? asortimentas, nepaisant vis?? proting?? Pardav??jo pastang??, lieka galimyb??, kad dalis Preki?? gali b??ti pateikiamos klaidingomis kainomis. Tuo atveju, jeigu Pardav??jas nustato, kad pateikta Preki?? kaina yra klaidinga, Pardav??jas apie tai elektroniniu pa??tu ar kitomis priemon??mis (skambu??iu ir/arba SMS ??inute) informuoja Pirk??j?? ir at??aukia u??sakym??. Pirk??jas, nor??damas ??sigyti t?? pa??i?? Prek?? u?? teising?? kain??, j?? turi u??sakyti i?? naujo. Pa??ym??tina, kad jeigu kainos klaidingumas yra akivaizdus ir Pirk??jas pagr??stai gal??jo atpa??inti tok?? klaiding?? ??kainojim??, Pardav??jui nekyla pareigos parduoti Pirk??jui Prekes neteisinga kaina.</p>
                <p>10.??Apmok??jimas</p>
                <p>10.1.??U?? Prekes Pirk??jas gali atsiskaityti:</p>
                <p>a)??naudodamasis elektronine bankininkyste;</p>
                <p>b)??grynaisiais pinigais arba banko kortele;</p>
                <p>d)??mok??jimo (kredito arba debetine) kortele.</p>
                <p>10.2.??Juridiniams asmenims taip pat suteikiama galimyb?? atsiskaityti bankiniu pavedimu ?? Pardav??jo s??skait??, nurodom?? Pirk??jui siun??iamoje i??ankstin??je PVM s??skaitoje fakt??roje, mok??jimo paskirtyje nurodant Pirk??jui suteikt?? u??sakymo numer??.</p>
                <p>10.2.1.????Juridiniams asmenims, atsiskaitantiems pavedimu ar elektronine bankininkyste, rekomenduojama pavedimo informacijoje perduoti ??mon??s kod?? greitesniam mok??tojo identifikavimui. Tokiu b??du u??sakymas sistemoje bus grei??iau patvirtinamas ir pradedamas vykdyti.</p>
                <p>10.3. Pirk??jui pasirinkus 10.1(a, b ir d) punktuose nurodyt?? atsiskaitymo b??d??, Pirk??jas privalo patvirtinti mok??jimo pavedim?? Pirk??jo banke ne v??liau kaip per 24 (dvide??imt keturias) valandas nuo mygtuko ???U??sakyti??? paspaudimo. Per ???? termin?? nepatvirtinus mok??jimo pavedimo, Pardav??jas turi teis?? laikyti, kad Pirk??jas atsisak?? sudaryti Sutart??, ir anuliuoti u??sakym??.</p>
                <p>11.??Pirk??jo pareigos</p>
                <p>11.1.??Pirk??jas ??sipareigoja pirkimo formoje pateikti tik teisingus ir i??samius duomenis. Pasikeitus pirkimo formoje nurodytiems duomenims Pirk??jas privalo nedelsdamas juos atnaujinti.</p>
                <p>11.2.??Pirk??jas ??sipareigoja s????iningai ir teisingai naudotis??internetine parduotuve, nekenkti jos darbui ar stabiliam veikimui. Pirk??jui nesilaikant ??ios pareigos, Pardav??jas turi teis?? be i??ankstinio persp??jimo apriboti, sustabdyti (nutraukti) Pirk??jo galimyb?? naudotis internetine parduotuve ir neatsako u?? jokius su tuo susijusius Pirk??jo nuostolius.</p>
                <p>11.3.??Pirk??jas privalo sumok??ti u?? u??sisakytas Prekes ir priimti jas ??i?? Taisykli?? nustatyta tvarka.</p>
                <p>11.4.??Nepaisant pareig??, numatyt?? kituose Taisykli?? punktuose, Pirk??jas ??sipareigoja, prie?? prad??damas naudoti Prek?? ap??i??r??ti j?? ir ??sitikinti, kad gauta Prek?? yra ta, kuri?? Pirk??jas u??sak??.</p>
                <p>11.5.??Pirk??jas privalo laikytis kit?? ??iose Taisykl??se ir Lietuvos Respublikos teis??s aktuose nustatyt?? reikalavim??.</p>
                <p>12.??Pardav??jo pareigos</p>
                <p>12.1.??Pardav??jas ??sipareigoja:</p>
                <p>a)??d??ti pastangas sudarant s??lygas Pirk??jui tinkamai naudotis??internetin??s parduotuv??s teikiamomis paslaugomis;</p>
                <p>b)??gerbti Pirk??jo privatum??, Pirk??jo asmens duomenis tvarkyti tik ??i?? Taisykli??,??Privatumo politikos??ir Lietuvos Respublikos teis??s akt?? nustatyta tvarka.</p>
                <p>12.2.??Pardav??jas ??sipareigoja laikytis vis?? ??iose Taisykl??se prisiimt?? reikalavim??.</p>
                <p>13.??Prek??s kokyb??</p>
                <p>13.1.??Pardav??jas garantuoja Preki?? kokyb?? (??statymin?? kokyb??s garantija). Pardav??jas skirtingoms Preki?? r????ims suteikia tam tikr?? laik?? galiojan??i?? kokyb??s garantij??, kurios konkretus terminas ir kitos s??lygos nurodomos dokumentuose pateikiamuose kartu su Preke.??Prek??s gamintojo garantiniai ??sipareigojimai galioja tik tuo atveju, jei nepa??eistos prek??s eksploatavimo s??lygos. Prie?? naudodamasis Preke Pirk??jas turi atid??iai perskaitykite prek??s eksploatavimo instrukcij??, jei tokia yra.</p>
                <p>13.2.??Preki?? tr??kumai ??alinami, nekokybi??kos Prek??s kei??iamos, gr????inamos vadovaujantis ??iose Taisykl??se ??tvirtinta tvarka ir atsi??velgiant ?? taikytin?? Lietuvos Respublikos teis??s akt?? reikalavimus.</p>
                <p>13.3.??Teikdamas skund?? Pirk??jas turi prid??ti Prek??s ??sigijimo PVM s??skait?? fakt??r?? (jos numer??) bei nurodyti toki?? informacij??:</p>
                <p>a)??Prek??s u??sakymo numer??;</p>
                <p>b)????vardyti Prek??s defekto po??ymius ar tr??kumus;</p>
                <p>c)??pateikti kitus ??rodymus, pavyzd??iui, Prek??s nuotrauk??, nekokybi??kos vietos nuotrauk?? (jei tai mechaninis pa??eidimas ir ??manoma nufotografuoti), Prek??s pakuot??s nuotrauk??, kita.</p>
                <p>13.4.??Teikdamas skund?? Pirk??jas turi nurodyti, kaip pageidauja, kad b??t?? i??spr??sta pretenzija:</p>
                <p>a)??Pardav??jui neatlygintinai per proting?? termin?? pa??alinant Prek??s tr??kumus, jei tr??kumus ??manoma pa??alinti;</p>
                <p>b)??atitinkamai suma??inant pirkimo kain??;</p>
                <p>c)??pakei??iant Prek?? analogi??ka tinkamos kokyb??s preke, i??skyrus atvejus, kai tr??kumai yra nedideli arba jie atsirado d??l Pirk??jo kalt??s;</p>
                <p>d)??gr????inant sumok??t?? Prek??s kain?? ir atsisakant Sutarties, kai netinkamos kokyb??s Prek??s yra esminis u??sakymo pa??eidimas.</p>
                <p>13.5.??I??nagrin??jus pretenzij??, atsakymas pateikiamas per 5 (penkias) dienas.</p>
                <p>14.??Atsakomyb??</p>
                <p>14.1. Pirk??jas atsako u?? veiksmus, atliktus naudojantis??internetine parduotuve, ??skaitant, bet neapsiribojant, u?? pirkimo formoje pateikt?? duomen?? teisingum??. Pirk??jas prisiima atsakomyb?? u?? padarinius, kilusius d??l pirkimo formoje pateikt?? duomen?? klaidingumo ar netikslumo.</p>
                <p>14.2.??Internetin??s parduotuv??s Pirk??jas atsako u?? savo prisijungimo duomen?? saugojim?? ir (arba) perdavim?? tretiesiems asmenims. Jeigu internetin??s parduotuv??s teikiamomis paslaugomis naudojasi tretieji asmenys, prisijung?? prie internetin??s parduotuv??s per Pirk??jo prisijungimo duomenis, Pardav??jas tok?? asmen?? laiko Pirk??ju ir Pirk??jas atsako u?? visus tokio tre??iojo asmens veiksmus, atliktus internetin??je parduotuv??je.</p>
                <p>14.3.??Pardav??jas, tiek kiek tai neprie??tarauja taikytiniems teis??s aktams, yra atleid??iamas nuo bet kokios atsakomyb??s tais atvejais, kai nuostoliai kyla d??l to, jog Pirk??jas, neatsi??velgdamas ?? Pardav??jo rekomendacijas ir savo ??sipareigojimus, nesusipa??ino su ??iomis Taisykl??mis, Privatumo politika ir kitais ??iose Taisykl??se nurodomais dokumentais, nors tokia galimyb?? jam buvo suteikta.</p>
                <p>14.4.??Atsi??velgdami ?? Lietuvos Respublikos elektroninio para??o ??statymo 8 straipsnio 3 dalies nuostatas, Pirk??jas ir Pardav??jas susitaria, kad Pirk??jo veiksm????internetin??je parduotuv??je patvirtinimas prisijungimo prie internetin??s parduotuv??s duomenimis (atpa??inimo kodu) turi Lietuvos Respublikos elektroninio para??o ??statymo 8 straipsnio 1 dalyje ??tvirtint?? elektroninio para??o teisin?? gali?? (t. y. turi toki?? pa??i?? teisin?? gali??, kaip ir para??as ra??ytiniuose dokumentuose ir yra leistinas kaip ??rodymo priemon?? teisme). Pirk??jas privalo saugoti savo prisijungimo prie internetin??s parduotuv??s duomenis ir j?? neatskleisti, u??tikrinti, kad duomenys b??t?? ??inomi tik jam pa??iam ir duomenimis naudot??si tik jis pats, neperduoti ir kitais b??dais nesudaryti galimyb??s kitiems asmenims su tais duomenimis susipa??inti ar jais pasinaudoti. Kilus ??tarimui, kad prisijungimo duomenys gal??jo b??ti su??inoti kito asmens, nedelsiant apie tai prane??ti Pardav??jui, taip pat nedelsiant informuoti Pardav??j?? apie prisijungimo prie internetin??s parduotuv??s duomen?? pa??eidim?? ar pavie??inim??. Visi veiksmai, atlikti naudojantis Pirk??jo atpa??inimo kodu, laikomi atliktais Pirk??jo, ir Pirk??jas prisiima vis?? atsakomyb?? u?? toki?? veiksm?? pasekmes.</p>
                <p>14.5.??U?? Sutarties, sudarytos naudojantis??internetine parduotuve, pa??eidim?? ??alys atsako Lietuvos Respublikos teis??s akt?? nustatyta tvarka.</p>
                <p>14.6.??Tuo atveju, jeigu Pardav??jas pa??eid??ia ??i?? Taisykli?? nuostatas, jis yra atsakingas u?? Pirk??jo patirt?? ??al?? ar nuostolius, kurie kyla kaip numatytina ??i?? Taisykli?? pa??eidimo pasekm??. ??ala arba nuostoliai laikomi numatytinais, jeigu jie yra akivaizdi Pardav??jo pa??eidimo pasekm?? arba, jeigu toki?? ??al?? ar nuostolius Pardav??jas ir Pirk??jas suvok??, sudarydami Sutart??.</p>
                <p>15.??Pardav??jo nekontroliuojami ??vykiai</p>
                <p>15.1.??Pardav??jas nebus atsakingas u?? Sutarties ar bet koki?? ??sipareigojim?? pagal Sutart?? ne??vykdymo arba pav??luoto ??vykdymo, jeigu toks ne??vykdymas ar v??lavimas atsirado d??l Pardav??jo nekontroliuojam?? ??vyki??, kaip jie yra apibr????ti ??i?? Taisykli?? 15.2 punkte.</p>
                <p>15.2.??Pardav??jo nekontroliuojamas ??vykis rei??kia bet kok?? veiksm?? ar ??vyk??, kurio Pardav??jas pagr??stai negali kontroliuoti.</p>
                <p>15.3.??Tuo atveju, jeigu ??vyksta Pardav??jo nekontroliuojamas ??vykis, kuris daro ??tak?? tinkamam Pardav??jo ??sipareigojim?? pagal Sutart?? vykdymui:</p>
                <p>a)??Pardav??jas nedelsdamas informuos Pirk??j??; ir</p>
                <p>b)??Pardav??jo ??sipareigojim??, kylan??i?? i?? Sutarties, vykdymas bus sustabdytas ir ??sipareigojim?? ??vykdymo terminas bus prat??stas Pardav??jo nekontroliuojam?? ??vyki?? trukmei. Jeigu Pardav??jo nekontroliuojami ??vykiai daro ??tak?? Preki?? pristatymui Pirk??jui, Pardav??jas suderins nauj?? pristatymo dat?? po Pardav??jo nekontroliuojam?? ??vyki?? pabaigos.</p>
                <p>16.??Informacijos siuntimas</p>
                <p>16.1.??Taisykl??se vartojama s??voka ???ra??tu??? apima ir elektroninius lai??kus.</p>
                <p>16.2.??Pirk??jas, siekdamas susisiekti su Pardav??ju ra??tu arba tuo atveju, jei Taisykl??se numatyta Pirk??jo pareiga susisiekti su Pardav??ju ra??tu, siun??ia Pardav??jui elektronin?? lai??k?? adresu info@treklama.lt ??arba ??prast?? lai??k?? UAB ???Tauro paslaugos???, Daug??li?? g. 79B, Kur????nai, LT-81116 ??iauli?? r. Pardav??jas Pirk??j?? apie prane??imo gavim?? informuos ra??tu (da??niausiai elektroninio pa??to lai??ku). Sutarties atsisakymo tikslu, Pirk??jo kreipimosi ?? Pardav??j?? tvarka numatyta ??i?? Taisykli?? 7 dalyje.</p>
                <p>16.3.??Pardav??jas visus prane??imus Pirk??jui siun??ia Pirk??jo pirkimo formoje pateiktu elektroninio pa??to adresu.</p>
                <p>17.??Kitos nuostatos</p>
                <p>17.1.??Bet kokiai Sutar??iai, sudaromai tarp Pardav??jo ir Pirk??jo yra taikomos ??ios Taisykl??s kartu su dokumentais, ai??kiai nurodytais jose. Bet kokie nukrypimai nuo ??i?? Taisykli?? galioja tik tuo atveju, jeigu jie yra ??forminami ra??ytiniu dokumentu.</p>
                <p>17.2.??Pirk??jas, vadovaujantis Lietuvos Respublikos teis??s aktais, turi tam tikras teises, susijusias su netinkamos kokyb??s Prek??mis. Jokia ??i?? Taisykli?? nuostata netur??t?? b??ti interpretuojama kaip suvar??anti ar apribojanti naudojim??si tokiomis teis??mis.</p>
                <p>17.3.??Pardav??jas turi teis?? perleisti savo teises ir pareigas pagal Sutart?? tre??iajam asmeniui ar asmenims, ta??iau toks teisi?? ir pareig?? perleidimas netur??s jokios ??takos Pirk??jo teis??ms bei Pardav??jo ??sipareigojimams pagal ??ias Taisykles. Tokio perleidimo atveju Pardav??jas informuos Pirk??j??, pateikdamas informacij?? apie perleidim????internetin??je parduotuv??je.</p>
                <p>17.4.??Pirk??jas neturi teis??s perleisti ar perduoti vis?? ar dalies teisi?? ir ??sipareigojim??, kylan??i?? i?? ??i?? Taisykli??, tre??iajam asmeniui ar asmenims be Pardav??jo ra??ytinio sutikimo.</p>
                <p>17.5.??Jei kuri nors ??i?? Taisykli?? nuostat?? yra teismo pripa????stama neteis??ta, negaliojan??ia arba ne??gyvendinama, kitos ??i?? Taisykli?? nuostatos lieka galioti ir veikti visa apimtimi. Bet kuri ??i?? Taisykli?? nuostata, pripa??inta neteis??ta, negaliojan??ia ar ne??gyvendinama tik i?? dalies ar tam tikra apimtimi, liks galioti ta apimtimi, kuria ji nebuvo pripa??inta neteis??ta, negaliojan??ia ar ne??gyvendinama.</p>
                <p>17.6.??Jeigu ??iose Taisykl??se n??ra nurodyta kitaip, bet koks Pardav??jo v??lavimas pasinaudoti teise pagal ??i?? Sutart?? nerei??kia Pirk??jo atleidimo nuo ??sipareigojimo vykdymo arba ??ios teis??s atsisakymo, o atskiras arba dalinis bet kurio ??sipareigojimo ??vykdymas arba atskiras arba dalinis pasinaudojimas bet kuria teise nerei??kia, kad ??is ??sipareigojimas neturi b??ti vykdomas arba ??ia teise negali b??ti naudojamasi toliau.</p>
                <p>17.7.????ioms Taisykl??ms ir santykiams tarp ??ali?? pagal ??ias Taisykles (??skaitant Sutarties sudarymo, galiojimo, negaliojimo, ??gyvendinimo ir nutraukimo klausimus) taikomi Lietuvos Respublikos ??statymai ir jos ai??kinamos remiantis Lietuvos Respublikos ??statymais.</p>
                <p>17.8.??Kiekvienas gin??as, nesutarimas ar reikalavimas, kylantis i?? ??i?? Taisykli?? ar susij??s su ??iomis Taisykl??mis, j?? pa??eidimu, nutraukimu ar galiojimu, galutinai sprend??iamas Lietuvos Respublikos teis??s akt?? nustatyta tvarka.</p>
                <p>17.9.??Pra??ymus ar skundus d??l Pardav??jo??internetin??je parduotuv??je ??sigytos Prek??s Pirk??jas gali pateikti elektroninio vartotoj?? gin???? sprendimo platformoje??<a href='http://ec.europa.eu/odr/' target="_blank" rel="noreferrer">http://ec.europa.eu/odr/</a>.</p>
                <p>17.10. Vartojimo gin??us neteismine tvarka sprend??ia Valstybin?? vartotoj?? teisi?? apsaugos tarnyba, buvein??s adresas Vilniaus g. 25, LT-01402 Vilnius,??<a href='http://www.vvtat.lt/' target="_blank" rel="noreferrer">www.vvtat.lt.</a></p>
            </Box>
        </Box>
    )
}

export default BuyRules
