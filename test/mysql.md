```
// create database pet 创建数据库
// show tables  查看表
// 查看数据表结构

// create table MyClass(
//     > id int(4) not null primary key auto_increment,
//     > name char(20) not null,
//     > sex int(4) not null default '0',
//     > degree double(16,2));



create table MyDog(id int(4) not null primary key auto_increment,name char(20) not null,sex int(4) not null default '0')

// 表结构
// desc MyClass;

//  插入数据
// insert into MyClass values(1,'Tom',96.45),(2,'Joan',82.99), (2,'Wang', 96.59);

// 删除数据
// delete from MyClass where id=1;

// 查询数据
// select * from MyClass;

// 更新数据
// update MyClass set name='Mary' where id=1;

// 数据类型
// create table TestTinyInt(
//     id TINYINT not null
// )
// insert into TestTinyInt values(125)
// TINYINT	1 Bytes	(-128，127)	(0，255)	小整数值
// SMALLINT	2 Bytes	(-32 768，32 767)	(0，65 535)	大整数值
// MEDIUMINT	3 Bytes	(-8 388 608，8 388 607)	(0，16 777 215)	大整数值
// INT或INTEGER	4 Bytes	(-2 147 483 648，2 147 483 647)	(0，4 294 967 295)	大整数值
// BIGINT	8 Bytes	(-9,223,372,036,854,775,808，9 223 372 036 854 775 807)	(0，18 446 744 073 709 551 615)	极大整数值
// FLOAT	4 Bytes	(-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38)	0，(1.175 494 351 E-38，3.402 823 466 E+38)	单精度
// 浮点数值
// DOUBLE	8 Bytes	(-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308)	0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308)	双精度
// 浮点数值
// DECIMAL	对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2	依赖于M和D的值	依赖于M和D的值	小数值


// 约束
// primary key 主键约束 不重复也不为空; 联合主键Composite Primary Key
// auto_increment 自增约束
// UNIQUE 唯一约束 
// create table User(
    id int(4)
    name char(20)
); 


// 修改键值（一般表初始就建立一次，使用场景较小）
alter table add
alter table drop
alter table modify

ALTER TABLE table_name ADD field_name field_type;
ALTER TABLE table_name CHANGE old_field_name new_field_name field_type;
ALTER TABLE table_name DROP field_name;

```