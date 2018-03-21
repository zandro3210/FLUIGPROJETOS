function createDataset(fields, constraints, sortFields) {

	xml = new XML("<teste><a><d></d><e></e></a><b></b><c></c></teste>");
	 // console.dir(xml);

	 // xml.toXMLString()
	 // console.log(xml.toXMLString(this));
	 

	 var dataset = DatasetBuilder.newDataset();
	 dataset.addColumn("RESULTADO");
	 
	 log.info("()()()()()()()()()()()()()(REGISTRANDO ECM");
	 try {
	 com.totvs.technology.foundation.sdk.util.IntegrationUtil.sendAsyncMessage("registerIndexCallback", "java:global/fluig/ecm-ejb/wdk/IndexCallback!com.totvs.technology.foundation.indexer.common.FDNIndexCallback", true);
	 com.totvs.technology.foundation.sdk.util.IntegrationUtil.sendAsyncMessage("registerReindexCommand", "java:global/fluig/ecm-ejb/wdk/ReindexCommand!com.totvs.technology.foundation.indexer.service.reindex.ReindexCommand", true);
	 com.totvs.technology.foundation.sdk.util.IntegrationUtil.sendAsyncMessage("registerReindexCommand","java:global/fluig/ecm-ejb/wdk/ProcessReindexCommand!com.totvs.technology.foundation.indexer.service.reindex.ReindexCommand", true);
	 com.totvs.technology.foundation.sdk.util.IntegrationUtil.sendAsyncMessage("registerReindexCommand","java:global/fluig/ecm-ejb/wdk/QuickReindexCommand!com.totvs.technology.foundation.indexer.service.reindex.ReindexCommand", true);
	 com.totvs.technology.foundation.sdk.util.IntegrationUtil.sendAsyncMessage("registertReindexCompleteNotifier","java:global/fluig/ecm-ejb/wdk/ReindexCompleteNotifier!com.totvs.technology.foundation.indexer.service.reindex.ReindexCompleteNotifier", true);
	 com.totvs.technology.foundation.sdk.util.IntegrationUtil.sendAsyncMessage("registerSearchPlugin","java:global/fluig/ecm-ejb/service/ECMSearchPlugin!com.totvs.technology.foundation.indexer.common.SearchPlugin", true);
	 var a = new Array();
	 a[0] = "ok";
	 dataset.addRow(a);
	 }catch(e){
		 var ee = new Array();
		 ee[0] = "ERRO";
		 dataset.addRow(ee);
	 }
	 
	 log.info("()()()()()()()()()()()()()(REGISTRANDO SOCIAL");
	 try {
         com.totvs.technology.foundation.sdk.util.IntegrationUtil.sendAsyncMessage("registerSearchPlugin",
                 "java:global/fluig-async/social-ecm-jms-async/service/SocialSearchPlugin" , true);
         com.totvs.technology.foundation.sdk.util.IntegrationUtil.sendAsyncMessage("registerReindexCommand",
                 "java:global/fluig-async/social-ecm-jms-async/index/command/social" , true);
         com.totvs.technology.foundation.sdk.util.IntegrationUtil.sendAsyncMessage("registerReindexCommand",
                 "java:global/fluig-async/social-ecm-jms-async/index/command/post", true);
	 
	 var s = new Array();
	 s[0] = "ok";
	 dataset.addRow(s);
	 }catch(e1){
		 var e1 = new Array();
		 e1[0] = "ERRO";
		 dataset.addRow(e1);
	 }
	 
	 
	 
	 return dataset;
	 
}