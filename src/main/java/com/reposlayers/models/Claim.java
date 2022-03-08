package com.reposlayers.models;

import lombok.*;

import javax.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Entity(name="claims")
@Table(name="insurance_information")
@AllArgsConstructor @NoArgsConstructor @Data
public class Claim {

    @Id
    @Column(name="claim_id")
    private int claimId;

    @Column(name = "customer_id")
    private String customerId;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_age")
    private int customerAge;

    @Column(name = "agent_id")
    private String agentId;

    @Column(name = "agent_name")
    private String agentName;

    @Column(name = "agent_rating")
    private int agentRating;

    @Column(name="amount")
    private BigDecimal amount;

    @Column(name = "datetime")
    private Timestamp datetime;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name = "approval")
    private char approval;

    @Column(name = "reimbursement_id")
    private String reimbursementId;






    /**
     * reason
     * failure_reason
     * reimbursment_id
     * approval
     * state
     * country
     * datetime
     * agent_rating
     * amount
     * agent_name
     * agent_id
     * Customer_age
     * customer_name
     * customer_id
     * claim_id
     */

}
