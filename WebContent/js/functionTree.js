
resTree = Ext.extend(Ext.Panel, {
    initComponent: function() {
        var mytree = new Ext.tree.TreePanel({
          
            id: "tp",
            animate: true,
            title: "系统功能菜单",
            collapsible: true,
            enableDD: true,
            enableDrag: true,
            rootVisible: true,
            autoScroll: true,
            autoHeight: true,
            width: 150,
            lines: true,
            buttons: [{
                text: "添加消防",
                handler: function(e) {
                    var ob = {};
                    ob.id = id++;
                    ob.text = "消防部门";
                    ob.type = "fireDepartment";
                    resTree.prototype.addNode(ob);
                }
}]
            });
            var root = new Ext.tree.TreeNode({
                id: "root",
                text: "信息管理",
                expanded: true

            });
            ///////////产生消防资源树Start////////////////////////

            var fireDepartment = new Ext.tree.TreeNode({
                id: "fireDepartment",
                text: "<img src='../img/active/fireDepartment.png' width='20px'/>",
                singleClickExpand: true,
                checked: false,
                icon: "",
                listeners: {
                    "checkchange": function(e) {
                        resTree.prototype.checkAll(e);
                    }
                }
            });


            var fireDeparment1 = new Ext.tree.TreeNode({
                id: "90",
                text: "沙坪坝消防总队",
                icon: "",
                checked: false,
                leaf: true

            });


            var fireDeparment2 = new Ext.tree.TreeNode({
                id: "91",
                icon: "",
                text: "江北消防总队",
                checked: false,
                leaf: true


            });

            var fireDeparment3 = new Ext.tree.TreeNode({
                id: "92",
                text: "渝北消防总队",
                checked: false,
                leaf: true

            });

            fireDepartment.appendChild(fireDeparment1);
            fireDepartment.appendChild(fireDeparment2);
            fireDepartment.appendChild(fireDeparment3);

            ///////////产生消防资源树End////////////////////////

            ///////////产生医疗资源树Start////////////////////////

            var hospital = new Ext.tree.TreeNode({
                id: "hospital",
                text: "<img src='../img/active/hospital.png' width='20px'/>",
                singleClickExpand: true,
                icon: "../img/active/hospital.png",
                checked: false
            });

            var hospital1 = new Ext.tree.TreeNode({
                id: "80",
                text: "肿瘤医院",
                checked: false,
                leaf: true,
                icon: "../img/active/hospital.png"
            });


            var hospital2 = new Ext.tree.TreeNode({
                id: "81",
                text: "新桥医院",
                checked: false,
                leaf: true,
                icon: "../img/active/hospital.png"

            });

            hospital.appendChild(hospital1);
            hospital.appendChild(hospital2);

            ///////////产生医疗资源树End////////////////////////

            var institution = new Ext.tree.TreeNode({
                id: "institution",
                text: "<img src='../img/active/institution.png' width='20px'/>",
                singleClickExpand: true,
                icon: "../img/active/institution.png",
                checked: false
            });

            var person = new Ext.tree.TreeNode({
                id: "person",
                text: "<img src='../img/active/person.png' width='20px'/>",
                singleClickExpand: true,
                icon: "../img/active/person.png",
                checked: false
            });

            var danger = new Ext.tree.TreeNode({
                id: "danger",
                text: "<img src='../img/active/danger.png' width='20px'/>",
                singleClickExpand: true,
                icon: "../img/active/danger.png",
                checked: false
            });

            root.appendChild(fireDepartment);
            root.appendChild(hospital);
            root.appendChild(institution);
            root.appendChild(person);
            root.appendChild(danger);
            mytree.setRootNode(root);
            resTree.superclass.initComponent.apply(this, arguments);
            mytree.render();
        },
        checkAll: function(node) {

            if (node.hasChildNodes) {
                node.eachChild(function(child) {
                    child.attributes.checked = node.attributes.checked;
                    child.getUI().toggleCheck(node.attributes.checked);
                });
            }
        },
        addNode: function(o) {
            var res = new Ext.tree.TreeNode({
                checked: true,
                leaf: true
            });
            res.id = o.id;
            res.text = "消防资源";
            var f = Ext.getCmp("tp");
            f.root.childNodes[0].appendChild(res);


            f.appendChild(res);
        }

    });

    //Ext.reg("myTree", resTree);
   
   
