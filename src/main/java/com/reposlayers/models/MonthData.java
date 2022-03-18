package com.reposlayers.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Table(name="claims_by_month_csv")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthData {

    @Id
    @Column(name="id")
    private int id;

    private String months;

    private int claim_count;


}
