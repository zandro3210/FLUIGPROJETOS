function createDataset(fields, constraints, sortFields) {
       var newDataset = DatasetBuilder.newDataset();
       try {
             var bo = new com.datasul.technology.webdesk.dataset.business.DatasetBO();
             var method = bo.getClass().getDeclaredMethod("loadBuiltInDatasets");
             method.setAccessible(true);
             method.invoke(bo);

             var builts = bo.buildInDatasets;
             newDataset.addColumn("Datasets carregados");
             newDataset.addRow([builts.size()]);
       } catch (e) {
             newDataset.addColumn("Erro");
             newDataset.addRow([e.message]);
             log.error("ERRO => " + e.message);
       }
       return newDataset;
}