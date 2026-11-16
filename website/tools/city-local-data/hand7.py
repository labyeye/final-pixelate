def P(lead, cards, faq): return dict(lead=lead, cards=cards, faq=faq)
def F(C, a, b): return [a, b, (f"Is support available in {C}?", "Yes. Setup and training run over call, WhatsApp and screen-sharing, with on-site help for larger teams.")]
def Q(q, a): return (q, a)
import zlib
VS = [["Worker count and shifts", "Gate devices or app attendance", "Payroll and statutory reports"],
      ["How many people work each shift", "Face, biometric or app check-in", "PF, ESI and payslip needs"],
      ["Total headcount including contract labour", "Number of gates and units", "Reports your clients or auditors need"],
      ["Size of the permanent and contract crews", "Hardware you already have installed", "How much of payroll you want automated"]]
VO = [["Team size and sites", "App, selfie or device attendance", "Payroll modules"],
      ["Number of employees and branches", "Whether you need devices or only the app", "Payslips and leave in the same system"],
      ["Headcount across locations", "GPS, selfie or biometric check-in", "Training and support after setup"],
      ["Staff on rotating or fixed hours", "How staff will mark attendance", "Reports owners want each month"]]
COST_S, COST_O = "S", "O"
def C4(a, b, c, d):
    v = zlib.crc32(a[0].encode()) % 4
    c = (VS if c == "S" else VO)[v] if c in ("S", "O") else c
    return [("Who needs this in " + a[0], a[1]), ("What " + a[0] + " employers should expect", b), ("Cost factors", c), ("Mistakes to avoid", d)]
PAGES = {
'madhya-pradesh/bhopal': P(
 "Bhopal is the state capital, with government offices, BHEL and Govindpura industrial units, AIIMS and large hospitals, New Market retail and coaching around MP Nagar. Contractors, hospitals and offices all run different schedules. This guide covers attendance software for Bhopal.",
 C4(("Bhopal", ["BHEL ancillary and Govindpura industrial units", "Hospitals, clinics and diagnostic labs", "Coaching centres around MP Nagar, retail in New Market and contractors"]), ["Shift and overtime rules for industrial and hospital staff", "Geo-fenced check-in for contractor crews", "Faculty and staff attendance in one dashboard"], COST_S, ["Paper muster for contractors", "Fixed shifts for hospital staff", "Separate sheets per site"]),
 F("Bhopal", Q("Can Govindpura units use NestHR?", "Yes. Shift attendance, overtime and payroll in one system."), Q("Can coaching centres track faculty hours?", "Yes. Faculty mark attendance by app or device."))),
'madhya-pradesh/burhanpur': P(
 "Burhanpur is a Maharashtra-border town with a long powerloom textile tradition, banana farming, and the Asirgarh fort nearby. Powerloom units run on shifts with many daily-wage workers. This guide covers attendance software for Burhanpur.",
 C4(("Burhanpur", ["Powerloom and weaving units", "Banana and agri-traders", "Shops, schools and clinics"]), ["Shift attendance for loom floors", "Daily-wage and monthly staff in one payroll", "Seasonal agri hands handled easily"], COST_S, ["Notebook attendance for loom workers", "No overtime record", "Mixed pay types in one sheet"]),
 F("Burhanpur", Q("Can powerloom units use NestHR?", "Yes. Device or app attendance with shift and overtime rules."), Q("Can I manage daily-wage workers?", "Yes. Set pay types by category."))),
'madhya-pradesh/chhindwara': P(
 "Chhindwara is a coal-belt and forest district with Pench-area tourism, Patalkot visitors and farming trade. Mining contractors, transport and hospitality are major employers. This guide covers attendance software for Chhindwara.",
 C4(("Chhindwara", ["Coal and mining-linked contractors", "Hotels and tour operators near Pench and Patalkot", "Farm traders, shops and clinics"]), ["Geo-fenced attendance for mine and site crews", "Seasonal tourism staff handled easily", "Shift and overtime tracking"], COST_O, ["Paper muster at sites", "No record for peak-season staff", "Mixed contractor records"]),
 F("Chhindwara", Q("Can mining contractors track crews by location?", "Yes. GPS or selfie check-in records time and place."), Q("Can tourism staff be added seasonally?", "Yes. Add and close them as needed."))),
'madhya-pradesh/dewas': P(
 "Dewas is an industrial city next to Indore, with the Bank Note Press, auto and engineering units, soybean processing and the Chamunda Mata Tekri temple. Factory shifts and contractors dominate. This guide covers attendance software for Dewas.",
 C4(("Dewas", ["Auto-parts and engineering units", "Soybean and agro-processing plants", "Contractors serving the printing and industrial sectors"]), ["Gate attendance with shifts and overtime", "Contractor crews tracked separately", "Reports ready for payroll"], COST_S, ["Paper muster at the gate", "Overtime disputes", "Mixed contract records"]),
 F("Dewas", Q("Can engineering units use NestHR?", "Yes. Shift attendance, overtime and payroll in one system."), Q("Can I keep contractor staff separate?", "Yes. Use departments."))),
'madhya-pradesh/gwalior': P(
 "Gwalior is a heritage and tourism city with the Gwalior Fort, a university, defence-linked services, stone work and the Malanpur industrial area nearby. Hospitality, education and manufacturing teams all need attendance records. This guide covers attendance software for Gwalior.",
 C4(("Gwalior", ["Hotels, heritage stays and tour operators", "Manufacturing units around Malanpur", "Schools, colleges and hospitals"]), ["Shift rosters for hospitality teams", "Gate attendance for factory crews", "Faculty and staff attendance by app"], COST_O, ["Paper rosters", "No overtime tracking", "Separate sheets per unit"]),
 F("Gwalior", Q("Can factories near Malanpur use NestHR?", "Yes. Shift attendance, overtime and payroll in one system."), Q("Can heritage hotels manage seasonal staff?", "Yes. Add and close temporary staff as needed."))),
'madhya-pradesh/jabalpur': P(
 "Jabalpur is home to ordnance and vehicle factories, the Marble Rocks at Bhedaghat, a High Court, a railway zone headquarters and many colleges. Defence suppliers, contractors, hospitality and legal offices all operate here. This guide covers attendance software for Jabalpur.",
 C4(("Jabalpur", ["Ordnance-factory suppliers and contractors", "Hotels and tour operators near Bhedaghat", "Law firms, colleges and hospitals"]), ["Shift and gate attendance for supplier crews", "Seasonal tourism staff handled easily", "Leave and payroll linked to attendance"], COST_S, ["Paper muster for contractor crews", "Fixed shifts for rotating teams", "No leave record"]),
 F("Jabalpur", Q("Can suppliers to the factories use NestHR?", "Yes. Track crews by device or GPS and export reports for clients."), Q("Can hotels near Bhedaghat add seasonal staff?", "Yes. Add and close seasonal staff as needed."))),
'madhya-pradesh/katni': P(
 "Katni is known for limestone, lime and cement units and its railway junction, with mining contractors, transport and small kilns. Shift crews and daily-wage workers are common. This guide covers attendance software for Katni.",
 C4(("Katni", ["Lime and cement units", "Limestone mining and transport contractors", "Shops, schools and clinics"]), ["Shift and overtime tracking", "Geo-fenced attendance for mine crews", "Daily-wage and monthly staff in one payroll"], COST_S, ["Paper muster at kilns", "No location record", "Mixed pay types"]),
 F("Katni", Q("Can lime and cement units use NestHR?", "Yes. Shift attendance, overtime and payroll in one system."), Q("Can mine crews check in by GPS?", "Yes. The app records time and location."))),
'madhya-pradesh/khandwa': P(
 "Khandwa is a cotton and farming town on a main rail junction, close to Omkareshwar and the Indira Sagar dam. Employers include ginning units, traders, hospitality serving pilgrims and dam-linked contractors. This guide covers attendance software for Khandwa.",
 C4(("Khandwa", ["Cotton ginning and farm traders", "Hotels and services serving Omkareshwar visitors", "Contractors and transporters"]), ["Seasonal hands handled during cotton season", "Rosters for hospitality teams", "GPS attendance for field crews"], COST_O, ["No record of seasonal workers", "Paper rosters", "No overtime rule"]),
 F("Khandwa", Q("Can ginning units add seasonal workers?", "Yes. Add them for the season and close them after."), Q("Can pilgrimage hospitality use shift rosters?", "Yes. Define shifts and assign staff."))),
'madhya-pradesh/ratlam': P(
 "Ratlam is a gold-trading and namkeen city, known for Ratlam sev and a major railway division. Jewellers, namkeen makers and railway contractors form its main employer base. This guide covers attendance software for Ratlam.",
 C4(("Ratlam", ["Gold and jewellery showrooms", "Sev and namkeen producers", "Railway contractors and transporters"]), ["Showroom and counter attendance", "Early production shifts for namkeen units", "Contractor crews tracked separately"], COST_O, ["Notebook attendance", "No overtime record for production peaks", "Mixed contractor records"]),
 F("Ratlam", Q("Can namkeen makers run production shifts?", "Yes. Create shifts and track overtime."), Q("Can jewellers use selfie attendance?", "Yes. Selfie check-in records time and place."))),
'madhya-pradesh/rewa': P(
 "Rewa is a Vindhya-region city known for its large solar park, nearby cement and coal belts, the white tiger safari and a university. Plant contractors, tourism and education employers all operate here. This guide covers attendance software for Rewa.",
 C4(("Rewa", ["Solar, power and cement contractors", "Hotels and tour operators near the white tiger safari", "Schools, colleges and hospitals"]), ["Geo-fenced attendance for site crews", "Shift and overtime tracking", "Seasonal tourism staff handled easily"], COST_S, ["Paper muster at sites", "Mixed contractor records", "No overtime record"]),
 F("Rewa", Q("Can solar and power contractors track crews?", "Yes. GPS or selfie check-in with reports for clients."), Q("Can tourism staff be added seasonally?", "Yes. Add and close them as needed."))),
'madhya-pradesh/sagar': P(
 "Sagar is a university and defence town, with the Dr Harisingh Gour University, an army regimental centre and a refinery in the district at Bina. Educational institutes, contractors and small businesses are the main employers. This guide covers attendance software for Sagar.",
 C4(("Sagar", ["Universities, colleges and schools", "Contractors serving the cantonment and refinery", "Shops, clinics and transporters"]), ["Faculty and staff attendance in one dashboard", "Geo-fenced check-in for contractor crews", "Leave and payroll linked to attendance"], COST_O, ["Paper registers", "No location record", "Separate sheets"]),
 F("Sagar", Q("Can universities track staff attendance?", "Yes. Staff mark attendance by app or device."), Q("Can contractors track crews?", "Yes. GPS or device attendance."))),
'madhya-pradesh/satna': P(
 "Satna is a cement and stone-industry city, close to Chitrakoot and the Maihar cement belt. Plant crews and contractors run on shifts with large contract workforces. This guide covers attendance software for Satna.",
 C4(("Satna", ["Cement plants and contractors", "Stone and building-material units", "Transporters, shops and clinics"]), ["Shift and overtime tracking", "Contract and permanent staff separated", "Gate attendance for large crews"], COST_S, ["Paper muster at gates", "Overtime disputes", "Mixed contractor records"]),
 F("Satna", Q("Can cement contractors use NestHR?", "Yes. Track crews by device or GPS and export reports."), Q("Can I run rotating shifts?", "Yes. Define shifts and assign them to teams."))),
'madhya-pradesh/singrauli': P(
 "Singrauli is a power and coal hub, with the Vindhyachal thermal station, Northern Coalfields operations and a large contractor and supplier base. Crews work in rotating shifts across several sites. This guide covers attendance software for Singrauli.",
 C4(("Singrauli", ["Power and coal contractors", "Equipment and transport suppliers", "Hospitality, shops and clinics serving the workforce"]), ["Geo-fenced attendance for site crews", "Shift and overtime tracking", "Contractor crews tracked separately"], COST_S, ["Paper muster for large crews", "Mixed contractor and permanent records", "No audit trail"]),
 F("Singrauli", Q("Can contractors serving power plants use NestHR?", "Yes. Track crews by device or GPS and export reports for clients."), Q("Does NestHR keep a trail of corrections?", "Yes. Corrections go through approval and are logged."))),
'madhya-pradesh/ujjain': P(
 "Ujjain is a pilgrimage city with the Mahakaleshwar temple and Simhastha crowds, a university and a soybean and agri-trading market, plus industrial units in Nagda nearby. Hospitality and temple-linked services see sharp peaks. This guide covers attendance software for Ujjain.",
 C4(("Ujjain", ["Hotels, dharamshalas and food businesses", "Soybean and agri-traders", "Schools, university staff and shops"]), ["Festival-peak staff added and removed easily", "Shift rosters for hospitality teams", "Godown attendance with overtime"], COST_O, ["No record for peak-season hires", "Paper rosters", "No overtime tracking"]),
 F("Ujjain", Q("Can hotels in Ujjain add staff for Simhastha or festival peaks?", "Yes. Add temporary staff and close them after the peak."), Q("Can godowns track overtime?", "Yes. Set overtime rules once."))),
'maharashtra/akola': P(
 "Akola is a Vidarbha cotton and oilseed trading city, with dal and oil mills and an agricultural university. Mills and mandis run seasonal peaks around cotton and pulses. This guide covers attendance software for Akola.",
 C4(("Akola", ["Dal and oil mills", "Cotton and agri-traders", "Schools, colleges and clinics"]), ["Seasonal hands handled during harvest peaks", "Shift attendance for mills", "Mandi staff tracked by app or device"], COST_S, ["No record of seasonal workers", "Paper muster at mills", "No overtime rule"]),
 F("Akola", Q("Can mills in Akola add seasonal workers?", "Yes. Add them for the season and close them after."), Q("Can mills run shifts?", "Yes. Define shifts and overtime rules."))),
'maharashtra/amravati': P(
 "Amravati is a Vidarbha city with a growing textile park, orange and cotton trade, Chikhaldara hill-station tourism and an education market. Textile and agro units run shifts, while hospitality staff peak in the monsoon and winter. This guide covers attendance software for Amravati.",
 C4(("Amravati", ["Textile and spinning units", "Orange and cotton traders", "Hotels near Chikhaldara, schools and hospitals"]), ["Shift attendance for textile units", "Seasonal tourism staff handled easily", "Daily and monthly staff in one payroll"], COST_S, ["Paper muster", "No record of seasonal staff", "No overtime tracking"]),
 F("Amravati", Q("Can textile units use NestHR?", "Yes. Gate attendance, shifts, overtime and payroll in one system."), Q("Can Chikhaldara hotels add seasonal staff?", "Yes. Add and close temporary staff as needed."))),
'maharashtra/aurangabad': P(
 "Aurangabad, now also called Chhatrapati Sambhajinagar, is an auto and pharma manufacturing hub, with large MIDC estates at Waluj, Chikalthana and Shendra and tourism around Ajanta and Ellora. Plant shifts and hospitality peaks both need strong attendance control. This guide covers attendance software for Aurangabad.",
 C4(("Aurangabad", ["Auto-component and pharma units in Waluj and Chikalthana", "Hotels and tour operators serving Ajanta and Ellora", "Contractors, transporters and hospitals"]), ["Gate attendance with shifts and overtime", "Contractor crews tracked separately", "Seasonal tourism staff handled easily"], COST_S, ["Paper muster at the gate", "Overtime disputes", "Mixed contractor records"]),
 F("Aurangabad", Q("Can a Waluj unit run three shifts on NestHR?", "Yes. Define shifts once, use gate or face punches and overtime follows your rules."), Q("Can Ajanta-Ellora tour operators track guides?", "Yes. App check-in with GPS."))),
'maharashtra/jalgaon': P(
 "Jalgaon is known for banana farming, a gold-trading market, dal mills and large drip-irrigation and plastic-pipe makers. Agro and manufacturing units run shifts and seasonal peaks. This guide covers attendance software for Jalgaon.",
 C4(("Jalgaon", ["Banana growers, packers and traders", "Dal mills and plastic-pipe makers", "Gold showrooms and retail"]), ["Shift attendance for plants", "Seasonal hands for banana harvest", "Showroom attendance by selfie or app"], COST_S, ["No record for harvest staff", "Paper muster", "No overtime record"]),
 F("Jalgaon", Q("Can banana packers add seasonal workers?", "Yes. Add them for the season and close them after."), Q("Can plants run shifts?", "Yes. Define shifts and overtime rules."))),
'maharashtra/kolhapur': P(
 "Kolhapur is a foundry and engineering city, also known for Kolhapuri chappals, sugar mills and Mahalaxmi temple tourism. Foundries run heavy shift work with skilled labour, while tourism and sugar mills add seasonal peaks. This guide covers attendance software for Kolhapur.",
 C4(("Kolhapur", ["Foundries and engineering units", "Chappal makers and sugar mills", "Hotels and services serving Mahalaxmi visitors"]), ["Shift and overtime tracking for foundries", "Seasonal sugar-mill labour handled easily", "Temple-season hospitality rosters"], COST_S, ["Paper muster for foundry crews", "No overtime record", "No record for seasonal staff"]),
 F("Kolhapur", Q("Can foundries in Kolhapur use NestHR?", "Yes. Gate attendance, shifts, overtime and payroll in one system."), Q("Can sugar mills add seasonal labour?", "Yes. Add and close seasonal staff as needed."))),
'maharashtra/latur': P(
 "Latur is a Marathwada city known for pulses and oilseed trade and for its school and coaching market. Mandi traders, processing units and institutes are the main employers. This guide covers attendance software for Latur.",
 C4(("Latur", ["Pulses and oilseed processors", "Coaching centres and schools", "Traders, transporters and clinics"]), ["Seasonal mandi hands handled easily", "Faculty attendance by app or device", "Godown attendance with overtime"], COST_O, ["No record of seasonal staff", "Paper registers for faculty", "No overtime rule"]),
 F("Latur", Q("Can coaching centres track faculty hours?", "Yes. Faculty mark attendance by app or device."), Q("Can mandi crews add seasonal workers?", "Yes. Add and close them as needed."))),
'maharashtra/mumbai': P(
 "Mumbai is India's financial and entertainment capital, with offices in BKC, Lower Parel and Andheri, small manufacturing in Dharavi and Kurla, ports, hotels and a huge hospitality sector. Teams work across long commutes and rotating shifts. This guide covers attendance software for Mumbai.",
 C4(("Mumbai", ["Corporate offices in BKC, Lower Parel and Andheri", "Small manufacturers in Dharavi, Kurla and MIDC areas", "Hotels, restaurants, film and media production"]), ["Hybrid and flexible attendance with geo-fence", "Shift rosters for hospitality and manufacturing", "Branch-wise dashboards for multi-location firms"], COST_O, ["One rule for office and shop-floor staff", "Paper rosters for rotating shifts", "No policy for flexible hours"]),
 F("Mumbai", Q("Can a restaurant chain with many outlets use NestHR?", "Yes. Outlets are branches in one account with a combined dashboard."), Q("Can film and media crews check in by location?", "Yes. App check-in with GPS."))),
'maharashtra/nagpur': P(
 "Nagpur is a central-India logistics and healthcare hub, with the MIHAN business park, Butibori MIDC, AIIMS, orange trade and a large defence presence. Logistics crews, hospital staff and plant workers each run different shifts. This guide covers attendance software for Nagpur.",
 C4(("Nagpur", ["Logistics and warehousing at MIHAN and Butibori", "Hospitals, clinics and diagnostic labs", "Orange traders, manufacturers and IT firms"]), ["Shift and overtime tracking for plants and hospitals", "GPS attendance for drivers and field staff", "Hybrid attendance for office teams"], COST_S, ["Paper rosters for hospitals", "No location record for drivers", "Separate tools per site"]),
 F("Nagpur", Q("Can warehouses at MIHAN use NestHR?", "Yes. Device or app attendance with shift and overtime rules."), Q("Can hospitals run doctor and nurse rosters?", "Yes. Create shifts and track attendance, overtime and leave."))),
'maharashtra/nanded': P(
 "Nanded is a Marathwada city known for the Hazur Sahib Gurudwara, which draws large pilgrim crowds, a university, cotton and farm trade, and MIDC units. Hospitality and temple-linked services see peaks around major festivals. This guide covers attendance software for Nanded.",
 C4(("Nanded", ["Hotels, dharamshalas and food services", "Cotton and agri-traders", "University staff, schools and MIDC units"]), ["Festival-peak staff added and removed easily", "Shift rosters for hospitality teams", "Faculty and staff attendance by app"], COST_O, ["No record for peak hires", "Paper rosters", "No overtime tracking"]),
 F("Nanded", Q("Can hospitality in Nanded add staff for festival peaks?", "Yes. Add temporary staff and close them after."), Q("Can universities track staff attendance?", "Yes. Staff mark attendance by app or device."))),
'maharashtra/nashik': P(
 "Nashik is a grape-and-wine city and an industrial hub, with Ambad and Satpur MIDC units, a currency-note press and a large auto plant, plus Trimbakeshwar and Kumbh tourism. Factory shifts, seasonal vineyard labour and temple-season hospitality all need attendance control. This guide covers attendance software for Nashik.",
 C4(("Nashik", ["Auto-component and engineering units in Ambad and Satpur", "Vineyards, wineries and grape exporters", "Hotels and services around Trimbakeshwar"]), ["Gate attendance with shifts and overtime", "Seasonal vineyard labour handled easily", "Festival-peak hospitality rosters"], COST_S, ["Paper muster at gates", "No record of seasonal labour", "No overtime tracking"]),
 F("Nashik", Q("Can vineyards add seasonal labour?", "Yes. Add them for the season and close them after."), Q("Can MIDC units use NestHR?", "Yes. Shift attendance, overtime and payroll in one system."))),
'maharashtra/pune': P(
 "Pune is an IT, auto and education city, with Hinjewadi IT parks, Pimpri-Chinchwad, Chakan and Talegaon auto belts, many colleges and a strong startup scene. Office teams work hybrid, plants run shifts and contractors are everywhere. This guide covers attendance software for Pune.",
 C4(("Pune", ["IT parks in Hinjewadi and Kharadi", "Auto and engineering plants in Chakan and Pimpri-Chinchwad", "Colleges, startups and hospitality"]), ["Hybrid attendance with geo-fenced check-in", "Shift and overtime rules for plants", "Contractor crews tracked separately"], COST_S, ["One rule for office and plant staff", "Paper muster at plants", "No policy for hybrid days"]),
 F("Pune", Q("Can IT teams in Hinjewadi use NestHR for hybrid attendance?", "Yes. Staff check in from the app or web and managers see the combined view."), Q("Can plants in Chakan run shift attendance?", "Yes. Define shifts and use gate or face punches."))),
'maharashtra/ratnagiri': P(
 "Ratnagiri is a Konkan coastal city famous for Alphonso mangoes, with fishing, a port, MIDC units and tourism around Ganpatipule. Mango processing and fishing see strong seasonal peaks, while hospitality peaks in the monsoon and holidays. This guide covers attendance software for Ratnagiri.",
 C4(("Ratnagiri", ["Mango growers, packers and processors", "Fishing and seafood units", "Hotels and resorts around Ganpatipule"]), ["Seasonal packers and pickers handled easily", "Shift rosters for fish processing", "Seasonal hospitality rosters"], COST_O, ["No record for mango-season hires", "Paper rosters", "No overtime tracking"]),
 F("Ratnagiri", Q("Can mango processors add seasonal workers?", "Yes. Add them for the season and close them after."), Q("Can resorts near Ganpatipule use shift rosters?", "Yes. Define shifts and assign staff."))),
'maharashtra/sangli': P(
 "Sangli is known for its turmeric market, sugar mills and engineering units, with the twin city Miraj known for hospitals and musical instruments. Agri-trading, sugar and medical employers see seasonal and shift patterns. This guide covers attendance software for Sangli.",
 C4(("Sangli", ["Turmeric traders and agro units", "Sugar mills and engineering units", "Hospitals and clinics in Miraj"]), ["Seasonal labour handled in turmeric and crushing seasons", "Shift rosters for hospitals", "Gate attendance for factory floors"], COST_S, ["No record of seasonal staff", "Paper shift sheets", "No overtime rule"]),
 F("Sangli", Q("Can turmeric traders add seasonal workers?", "Yes. Add them for the season and close them after."), Q("Can hospitals in Miraj run shift rosters?", "Yes. Create shifts and track attendance."))),
'maharashtra/satara': P(
 "Satara is a mix of MIDC industry, sugar mills and hill-station tourism at Mahabaleshwar and Panchgani, with strawberry farming and the Kaas plateau flower season. Hospitality and agri work follow strong seasons. This guide covers attendance software for Satara.",
 C4(("Satara", ["MIDC factories and sugar mills", "Hotels and resorts at Mahabaleshwar and Panchgani", "Strawberry farms and agri-traders"]), ["Seasonal tourism and farm staff handled easily", "Gate attendance for factories", "Shift rosters for hospitality"], COST_O, ["No record for seasonal staff", "Paper rosters", "No overtime tracking"]),
 F("Satara", Q("Can resorts at Mahabaleshwar add seasonal staff?", "Yes. Add and close temporary staff as needed."), Q("Can MIDC units run shifts?", "Yes. Define shifts and overtime rules."))),
'maharashtra/solapur': P(
 "Solapur is known for terry towels and chaddars, textile mills, bidi making and a temple-linked trade. Textile units run shifts and the bidi industry has a large home-worker base. This guide covers attendance software for Solapur.",
 C4(("Solapur", ["Towel and textile units", "Bidi and small manufacturers", "Traders, transporters and hospitals"]), ["Shift and overtime tracking for textile floors", "Daily and monthly staff in one payroll", "Gate attendance for large crews"], COST_S, ["Paper muster for large floors", "No overtime record", "Mixed pay types in one sheet"]),
 F("Solapur", Q("Can towel makers use NestHR?", "Yes. Gate attendance, shifts, overtime and payroll in one system."), Q("Can I handle daily and monthly staff together?", "Yes. Set pay types by category."))),
}
