import {action,observable} from 'mobx';
import {firestore} from "../config";


class GetStore{
@observable worldC ='';
@observable worldD='';
@observable turkeyC='';
@observable turkeyD='';
@observable chinaC='';
@observable chinaD='';
@observable italyC='';
@observable italyD='';
@observable ıranC='';
@observable ıranD='';
@observable sKoreaC='';
@observable sKoreaD='';
@observable spainC='';
@observable spainD='';
@observable germanyC='';
@observable germanyD='';
@observable franceC='';
@observable franceD='';
@observable usaC='';
@observable usaD='';
@observable switzerlandC='';
@observable switzerlandD='';
@observable norwayC='';
@observable norwayD='';
@observable swedenC='';
@observable swedenD='';
@observable netherlandsC='';
@observable netherlandsD='';
@observable denmarkC='';
@observable denmarkD='';
@observable ukC='';
@observable ukD='';
@observable japanC='';
@observable japanD='';
@observable ıraqC='';
@observable ıraqD='';
@observable belgiumC='';
@observable belgiumD='';
@observable austriaC='';
@observable austriaD='';
@observable australiaC='';
@observable australiaD='';
@observable canadaC='';
@observable canadaD='';
@observable greeceC='';
@observable greeceD='';
@observable loading=true;

	@action getNumber = () => {
		var self = this;
		const docRef = firestore.collection("number");
		docRef.doc("one").get().then(function(doc) {
			if (doc.exists) {
				self.worldC=doc.data().worldC;
				self.worldD=doc.data().worldD;
				self.turkeyC=doc.data().turkeyC;
				self.turkeyD=doc.data().turkeyD;
				self.chinaC=doc.data().chinaC;
				self.chinaD=doc.data().chinaD;
				self.italyC=doc.data().italyC;
				self.italyD=doc.data().italyD;
				self.ıranC=doc.data().ıranC;
				self.ıranD=doc.data().ıranD;
				self.sKoreaC=doc.data().sKoreaC;
				self.sKoreaD=doc.data().sKoreaD;
				self.spainC=doc.data().spainC;
				self.spainD=doc.data().spainD;
				self.germanyC=doc.data().germanyC;
				self.germanyD=doc.data().germanyD;
				self.franceC=doc.data().franceC;
				self.franceD=doc.data().franceD;
				self.usaC=doc.data().usaC;
				self.usaD=doc.data().usaD;
				self.switzerlandC=doc.data().switzerlandC;
				self.switzerlandD=doc.data().switzerlandD;
				self.norwayC=doc.data().norwayC;
				self.norwayD=doc.data().norwayD;
				self.swedenC=doc.data().swedenC;
				self.swedenD=doc.data().swedenD;
				self.netherlandsC=doc.data().netherlandsC;
				self.netherlandsD=doc.data().netherlandsD;
				self.denmarkC=doc.data().denmarkC;
				self.denmarkD=doc.data().denmarkD;
				self.ukC=doc.data().ukC;
				self.ukD=doc.data().ukD;
				self.japanC=doc.data().japanC;
				self.japanD=doc.data().japanD;
				self.ıraqC=doc.data().ıraqC;
				self.ıraqD=doc.data().ıraqD;
				self.belgiumC=doc.data().belgiumC;
				self.belgiumD=doc.data().belgiumD;
				self.austriaC=doc.data().austriaC;
				self.austriaD=doc.data().austriaD;
				self.australiaC=doc.data().australiaC;
				self.australiaD=doc.data().australiaD;
				self.canadaC=doc.data().canadaC;
				self.canadaD=doc.data().canadaD;
				self.greeceC=doc.data().greeceC;
				self.greeceD=doc.data().greeceD;
			} else {
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
		self.loading=false;
	}

}

export default new GetStore();
