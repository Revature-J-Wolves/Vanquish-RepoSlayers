package com.reposlayers.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name= "commontime_csv")
@NoArgsConstructor
@AllArgsConstructor
@Data

public class ComTime {

    @Id
    private int id;

    @Column(name="hour")
    private int hour;
    private int claims;


}
